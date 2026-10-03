<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Service;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Sample data for demo purposes.
     * Safe to run more than once: rows are matched by email / title / name.
     */
    public function run(): void
    {
        // ---- Users (demo passwords, change before any real deployment) ----
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'firstName' => 'Admin',
                'lastName'  => 'User',
                'password'  => Hash::make('admin123'),
                'role'      => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'client@example.com'],
            [
                'firstName'  => 'Demo',
                'lastName'   => 'Client',
                'password'   => Hash::make('client123'),
                'clientCode' => 'AL001',
                'role'       => 'user',
            ]
        );

        // ---- Projects ----
        $projects = [
            ['title' => 'Villa Project',     'description' => 'Modern villa construction',        'location' => 'Kathmandu', 'imageUrl' => '/images/project1.png'],
            ['title' => 'Apartment Complex', 'description' => 'Multi-storey residential complex', 'location' => 'Lalitpur',  'imageUrl' => '/images/project2.png'],
            ['title' => 'Office Building',   'description' => 'Commercial office space',          'location' => 'Bhaktapur', 'imageUrl' => '/images/project3.png'],
        ];
        foreach ($projects as $p) {
            Project::updateOrCreate(['title' => $p['title']], $p);
        }

        // ---- Services ----
        $services = [
            ['title' => 'Residential Construction', 'description' => 'Homes built to your design.',       'icon' => 'home'],
            ['title' => 'Commercial Construction',  'description' => 'Offices, shops and warehouses.',     'icon' => 'building'],
            ['title' => 'Renovation',               'description' => 'Upgrades and remodeling of spaces.', 'icon' => 'tools'],
        ];
        foreach ($services as $s) {
            Service::updateOrCreate(['title' => $s['title']], $s);
        }

        // ---- Team ----
        $team = [
            ['name' => 'Team Member One',   'role' => 'Project Manager',  'imageUrl' => '/images/team1.jpg'],
            ['name' => 'Team Member Two',   'role' => 'Site Engineer',    'imageUrl' => '/images/team2.jpg'],
            ['name' => 'Team Member Three', 'role' => 'Architect',        'imageUrl' => '/images/team3.jpg'],
        ];
        foreach ($team as $t) {
            Team::updateOrCreate(['name' => $t['name']], $t);
        }
    }
}