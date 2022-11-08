<?php
return [
    'default' => 'paysera',
    'currency' => 'EUR',
    'country' => 'LT',
    'methods' => [
        '0' => 'Cash',
        '1' => 'Bank Transfer'
    ],
    'provider' => [
        'paysera' => [
            'name' => 'paysera',
            'ID' => 233124,
            'password' => '09cd6a70f2a9200798e660acc1b6d2e5',
            'api_version' => '1.6',
            'url' => [
              'payment' => 'https://www.paysera.com/pay/'
            ],
        ]
    ]
];