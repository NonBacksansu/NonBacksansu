{
    const cursor = document.getElementById('about-custom-cursor');
    const worksCard = document.getElementById('worksCard');
    const profileCard = document.getElementById('profileCard');

    // 1. Smooth Custom Cursor & 3D Tilt
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        const x = (window.innerWidth / 2 - e.pageX) / 45;
        const y = (window.innerHeight / 2 - e.pageY) / 45;
        if(profileCard) profileCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // 2. Skill Bar Fill Animation
    const animateBars = () => {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const percentage = bar.closest('.skill-bar-item').querySelector('.skill-info span:last-child').innerText;
            setTimeout(() => {
                bar.style.width = percentage;
            }, 500);
        });
    };

    // 3. Works Card Toggle Logic
    if(worksCard) {
        worksCard.addEventListener('click', (e) => {
            const isClose = e.target.classList.contains('close-btn');
            document.querySelector('.card-front').classList.toggle('hidden', !isClose);
            document.querySelector('.card-back').classList.toggle('hidden', isClose);
            cursor.style.borderColor = isClose ? '#38bdf8' : '#f472b6';
        });
    }

    // 4. Initial Load (Loader + Skill Animation)
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.getElementById('content').classList.remove('hidden');
                animateBars();
            }, 300);
        }, 300);
    });

    // 5. Interactive Go Back Button Effect
    document.getElementById('backBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = '0.5s ease-in';
        setTimeout(() => window.location.href = this.href, 500);
    });

}


