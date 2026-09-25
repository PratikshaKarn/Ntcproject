<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Same list as allowedOrigins in your Node server.js
    'allowed_origins' => [
        'http://localhost:5173',
        'https://alnoor-build-o8r6.vercel.app',
        'https://alnoor-build.vercel.app',
        'https://alnoor-build-mj1g-jare-alams-projects.vercel.app',
        'https://alnoorbuildworks.com',
        'https://www.alnoorbuildworks.com',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
