<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class ChatController extends Controller
{
    public function getMessages()
    {
        return Message::with('sender')
            ->latest()
            ->take(50)
            ->get()
            ->reverse()
            ->values()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'sender_id' => $msg->sender_id,
                    'sender_name' => $msg->sender->name ?? 'Unknown',
                    'time' => $msg->created_at->format('H:i'),
                ];
            });
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        Message::create([
            'sender_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return response()->json([
            'success' => true
        ]);
    }

    public function getUsers()
    {
        return User::select('id', 'name')->get();
    }
}