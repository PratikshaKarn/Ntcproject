<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'clientCode',
        'role',
        'hasPurchasedServices',
        'portfolio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'hasPurchasedServices' => 'boolean',
        // Mongo stored portfolio as a nested flexible object.
        // MySQL/Postgres store it as a JSON column and Eloquent
        // automatically encodes/decodes it to a PHP array for you.
        'portfolio' => 'array',
    ];

    // Sensible default so a brand new user always has the same
    // shape your React dashboard expects, instead of null.
    protected $attributes = [
        'portfolio' => '{"assignmentStatus":[],"complianceStatus":[],"financials":{"totalCost":0,"amountPaid":0,"nextInstallmentAmount":0,"nextInstallmentDate":""}}',
    ];
}
