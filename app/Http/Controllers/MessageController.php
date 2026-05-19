<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;

class MessageController extends Controller
{
    /**
     * Store Message
     */
    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'message' => 'required',
        ]);

        $message = Message::create([

            'sender_id' => $request->sender_id,

            'receiver_id' => $request->receiver_id,

            'message' => $request->message,
        ]);

        broadcast(
            new MessageSent($message)
        )->toOthers();

        return response()->json([
            'success' => true,
            'message' => $message,
        ]);
    }

    /**
     * Get Messages
     */
    public function index()
    {
        return Message::with('sender')
            ->latest()
            ->get();
    }
}