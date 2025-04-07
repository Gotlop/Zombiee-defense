window.onload = function () {
    // Inisialisasi canvas
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) {
        console.error("Canvas element with ID 'gameCanvas' not found!");
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get 2D context from canvas!");
        return;
    }

    // Atur ukuran canvas
    canvas.width = 800;
    canvas.height = 600;
    console.log("Canvas initialized: ", canvas.width, "x", canvas.height);

    // Objek pemain
    const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 20,
        height: 20,
        speed: 5,
    };

    // Array zombie
    const zombies = [];
    const zombieSpeed = 2;
    let score = 0;
    let lives = 3;

    // Fungsi spawn zombie
    function spawnZombie() {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        switch (side) {
            case 0: // Top
                x = Math.random() * canvas.width;
                y = -20;
                break;
            case 1: // Right
                x = canvas.width + 20;
                y = Math.random() * canvas.height;
                break;
            case 2: // Bottom
                x = Math.random() * canvas.width;
                y = canvas.height + 20;
                break;
            case 3: // Left
                x = -20;
                y = Math.random() * canvas.height;
                break;
        }
        zombies.push({ x, y, width: 20, height: 20 });
        console.log("Zombie spawned at: ", x, y);
    }

    // Fungsi gambar pemain
    function drawPlayer() {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    // Fungsi gambar zombie
    function drawZombies() {
        ctx.fillStyle = "green";
        zombies.forEach((zombie) => {
            ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
        });
    }

    // Fungsi gambar skor dan nyawa
    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText(`Lives: ${lives}`, 10, 60);
    }

    // Fungsi gerak zombie
    function moveZombies() {
        zombies.forEach((zombie, index) => {
            const dx = player.x - zombie.x;
            const dy = player.y - zombie.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            zombie.x += (dx / distance) * zombieSpeed;
            zombie.y += (dy / distance) * zombieSpeed;

            // Deteksi tabrakan
            if (
                zombie.x < player.x + player.width &&
                zombie.x + zombie.width > player.x &&
                zombie.y < player.y + player.height &&
                zombie.y + zombie.height > player.y
            ) {
                lives--;
                zombies.splice(index, 1);
                console.log("Collision detected! Lives left: ", lives);
                if (lives <= 0) {
                    alert("Game Over! Score: " + score);
                    document.location.reload();
                }
            }
        });
    }

    // Game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawZombies();
        drawScore();
        moveZombies();
        requestAnimationFrame(gameLoop);
    }

    // Kontrol pemain
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (player.y > 0) player.y -= player.speed;
                break;
            case "ArrowDown":
                if (player.y < canvas.height - player.height) player.y += player.speed;
                break;
            case "ArrowLeft":
                if (player.x > 0) player.x -= player.speed;
                break;
            case "ArrowRight":
                if (player.x < canvas.width - player.width) player.x += player.speed;
                break;
        }
        console.log("Player position: ", player.x, player.y);
    });

    // Mulai game
    setInterval(spawnZombie, 2000);
    console.log("Starting game loop...");
    gameLoop();
};
