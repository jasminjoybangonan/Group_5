<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleSwitchController extends Controller
{
    public function switchRole($role)
    {
        $user = Auth::user();
        
        // Check if user has the requested role
        if (!$user->hasRole($role)) {
            return redirect()->back()->with('error', 'You do not have permission to switch to this role.');
        }

        // Redirect to appropriate dashboard based on role
        switch ($role) {
            case 'writer':
                return redirect()->route('writer.dashboard');
            case 'editor':
                return redirect()->route('editor.dashboard');
            case 'student':
                return redirect()->route('student.dashboard');
            default:
                return redirect('/')->with('error', 'Invalid role specified.');
        }
    }
}
