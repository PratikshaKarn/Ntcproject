<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    // POST /api/contact
    public function store(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $subject = $request->input('subject');
        $message = $request->input('message');

        if (!$name || !$email || !$message) {
            return response()->json(['msg' => 'Please fill in all required fields.'], 400);
        }

        // Step 1: Save to database (same "save first, email second" order as the Node version)
        try {
            Contact::create(compact('name', 'email', 'subject', 'message'));
        } catch (\Throwable $dbError) {
            Log::error('DATABASE SAVE ERROR: ' . $dbError->getMessage());
            return response()->json(['msg' => 'Server Error: Could not save your message.'], 500);
        }

        // Step 2: Send the notification email — failure here should never
        // fail the request, since the message is already saved.
        try {
            if (!config('mail.mailers.smtp.username')) {
                Log::error('MAIL ERROR: mail credentials not set in .env');
                return response()->json(['msg' => 'Message received! (Admin email not configured)'], 201);
            }

            Mail::to(config('mail.from.address'))
                ->send(new ContactMail(compact('name', 'email', 'subject', 'message')));

            return response()->json(['msg' => 'Message received successfully! We will get back to you soon.'], 201);
        } catch (\Throwable $emailError) {
            Log::error('MAIL ERROR (Email not sent): ' . $emailError->getMessage());
            return response()->json(['msg' => 'Message received! (There was an issue notifying admin)'], 201);
        }
    }
}
