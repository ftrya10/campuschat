<x-app-layout>

    <div class="max-w-4xl mx-auto p-6">

        <h1 class="text-3xl font-bold mb-6">
            CampusChat
        </h1>
        

        <!-- CHAT BOX -->
        <div
            id="chat-box"
            class="bg-white border shadow rounded-2xl h-96 overflow-y-auto p-5 mb-5"
        >

            @foreach($messages as $chat)

                <div class="mb-3">

                    @if($chat->sender_id == auth()->id())

                        <div class="flex justify-end">

                            <div class="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                                {{ $chat->message }}
                            </div>

                        </div>

                    @else

                        <div class="flex justify-start">

                            <div class="bg-gray-200 px-4 py-2 rounded-2xl max-w-xs">
                                {{ $chat->message }}
                            </div>

                        </div>

                    @endif

                </div>

            @endforeach

        </div>

        <!-- FORM -->
        <form
            action="{{ route('send.message') }}"
            method="POST"
            class="flex gap-3"
        >

            @csrf

            <input
                type="hidden"
                name="receiver_id"
                value="2"
            >

            <input
                type="text"
                name="message"
                placeholder="Ketik pesan..."
                class="flex-1 border rounded-2xl px-4 py-3"
            >

            <button
                type="submit"
                class="bg-blue-500 text-white px-6 py-3 rounded-2xl"
            >
                Kirim
            </button>

        </form>

    </div>

    @vite(['resources/js/app.js'])

    <script>

        /*
        |--------------------------------------------------------------------------
        | REALTIME LISTENER
        |--------------------------------------------------------------------------
        */

        if (window.Echo) {

            window.Echo.channel('chat-room')
                .listen('MessageSent', (e) => {

                    const chatBox =
                        document.getElementById('chat-box');

                    const div =
                        document.createElement('div');

                    div.classList.add('mb-3');

                    div.innerHTML = `
                        <div class="flex justify-start">
                            <div class="bg-gray-200 px-4 py-2 rounded-2xl max-w-xs">
                                ${e.message.message}
                            </div>
                        </div>
                    `;

                    chatBox.appendChild(div);

                    chatBox.scrollTop =
                        chatBox.scrollHeight;

                });

        }

    </script>

</x-app-layout>