<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/d2ba3c872c.js" crossorigin="anonymous"></script>
    <!-- <script src="/var/www/html/projetScript/public/dist/test.js" type="module" defer></script> -->
    <script defer src="../../dist/test.js" type="module"></script> 
    <link rel="icon" href="path/to/your/favicon.ico" type="image/x-icon">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="tailwind.css">
    <title>GP MONDE</title>
    <style>
        .popup-form input,
        .popup-form select,
        .popup-forme input,
        .popup-forme select {
            background-color: white;
            color: gray;
        }

        .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }

        .popup-form,
        .popup-forme {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: blue;
            width: 90%;
            max-width: 700px;
            height: auto;
            max-height: 90%;
            scrollbar-width: none;
            overflow-y: auto;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
        }

        .popup-form form {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 1rem;
        }

        .popup-form .col-span-2 {
            grid-column: span 2;
        }

        .overlay,
        .overlaye {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        }

        .card:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>

<body class="bg-no-repeat bg-cover bg-center">
    <img src="Sans titre.jpeg" alt="img" class="w-full h-full -z-50 opacity-20">
    <div class="flex flex-row h-screen w-full absolute z-50 top-0 left-0">
        <!-- Sidebar -->
        <div id="sidebar" class="bg-white w-20 lg:w-80 h-full flex flex-col items-center p-4 shadow-lg sidebar">
            <img id="logo" src="https://ibp.info6tm.fr/api/v1/files/640890405b6e881dcd5d2b69/methodes/article_small/image.jpg" alt="logo" class="h-40 w-full mb-4">
            <nav class="flex flex-col gap-2 w-full">
                <a href="?page=accueil" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-house mr-2 block"></i><span class="lg:block hidden">Accueil</span></a>
                <a href="?page=dashboard" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-tachometer-alt mr-2 block"></i><span class="lg:block hidden">Dashboard</span></a>
                <a href="?page=cargaisons" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-ship mr-2 block"></i><span class="lg:block hidden">Cargaisons</span></a>
                <a href="?page=produits" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-boxes mr-2 block"></i><span class="lg:block hidden">Produits</span></a>
                <a href="?page=clientel" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-users mr-2 block"></i><span class="lg:block hidden">Clientel</span></a>
                <a href="?page=contact" class="flex items-center justify-center w-full py-2 text-lg text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"><i class="fa-solid fa-envelope mr-2 sidebar-icon"></i><span class="lg:block hidden">Contact</span></a>
            </nav>
            <form method="post" action="auth.php" class="w-full mt-auto">
                <button type="submit" name="deconnexion" class="flex items-center justify-center w-full py-2 text-lg text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"><i class="fa fa-power-off block" aria-hidden="true"></i><span class="lg:block hidden">Déconnexion</span></button>
            </form>
        </div>
        <!-- Main content -->
        <div class="flex-1 flex flex-col h-full">
            <header class="w-full h-20 bg-white shadow p-4 flex justify-between items-center lg:w-full">
                <div class="flex items-center lg:w-24">
                    <button id="sidebarToggle" class="mr-4 text-blue-600">
                        <i class="fa fa-bars text-2xl"></i>
                    </button>
                    <div class="relative">
                        <input type="text" id="search" placeholder="Search" class="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500">
                        <i class="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hidden lg:block"></i>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="text-xl text-blue-600 lg:block hidden">
                        <i class="fa-solid fa-calendar-days mr-2 "></i>
                        <?php echo date('d F Y'); ?>

                    </div>
                    <img src="https://scontent.fdkr5-1.fna.fbcdn.net/v/t39.30808-6/438169838_7637379586348202_6255268771699257220_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHhoLLmAmSWOFxXhRPD7czsV7z7TLkOJD9XvPtMuQ4kP8KVAhmIf6ddG9xEKLIhuoXfLyB_EQWWgrsunM7HZ8PY&_nc_ohc=J6FqTjHVG1oQ7kNvgF9CGoB&_nc_ht=scontent.fdkr5-1.fna&oh=00_AYCy8QMFKloUEOgVG1fFNwoHX4s0Up6Le2UQoPYVulsxsQ&oe=66566507" class="h-10 w-10 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200 ease-out mr-10">
                    <div class="h-full">
                        <div class="font-semibold">
                            BAYE SAER
                        </div>
                        <div class="font-semibold">
                            MBOW
                        </div>

                    </div>
                </div>
            </header>
            <main id="main-content" class="flex-1 p-4 overflow-auto hide-scrollbar ">

