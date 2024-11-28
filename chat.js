const caller = 'account-375491'

const chat = {
    prompt: async prompt => {
        chat.waiting = true;

        function post(data) {
            const name = data.company ? data.company : 'me';
            const title = document.createElement('span');

            title.innerHTML = name
            title.classList.add('name');

            const top = document.createElement('div');

            top.append(title);

            const bottom = document.createElement('div');
            bottom.innerHTML = data.content;

            const post = document.createElement('div');
            post.append(top, bottom);
            post.classList.add('post');
            document.getElementById('chat').appendChild(post);

            post.scrollIntoView({ behavior: 'smooth' });
        }

        post({content: prompt});

        await fetch('/company/messages/' + caller, {
            method: 'POST',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => response.json())
        .then(data => {
            post(data);
            chat.waiting = false;
        });
    },
};