<h2>New Message from AL-NOOR Website</h2>
<p><strong>Name:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>
<p><strong>Subject:</strong> {{ $data['subject'] ?: 'Not provided' }}</p>
<hr>
<p><strong>Message:</strong></p>
<p>{{ $data['message'] }}</p>
