<script lang="ts">
	import './layout.css';
	import '../../app.css'
	import { page } from '$app/stores'
	import ucabLogo from '$lib/images/logo-ucab.webp'
	import firstLoginImage from '$lib/images/edificio.png'
	import secondLoginImage from '$lib/images/login-image-two.png'
	import SignUpLogInSwitchButton from '$lib/components/sign-up-log-in-switch-button/SignUpLogInSwitchButton.svelte'

	let chosen: 'Iniciar sesión' | 'Registrarse' = 'Iniciar sesión'

	$: if ($page.url.pathname === '/sign-up') {
		chosen = 'Registrarse'
	} else if ($page.url.pathname === '/login') {
		chosen = 'Iniciar sesión'
	}
</script>


<main class="flex">
    <div class="min-h-screen flex flex-col items-center justify-start  pb-24 pt-10 w-1/2">
        <img src={ucabLogo} alt="logo de la ucab" class="max-w-[497px] aspect-[497/75] overflow-hidden mt-custom" />
        <div class="flex flex-col items-center justify-center h-full">
            <div class="flex flex-col gap-3 items-center">
                    <h1 class="text-center mb-2">Bienvenido de regreso</h1>
                    <h2 class="text-center  font-bold mb-5 max-w-[450px]">
                        A nuestro catálogo de egresados en línea
                    </h2>
            </div>
            <slot />
        </div>
    </div>
    <div>
        <img src={firstLoginImage} alt=""
            style="
				margin-top: 20px;
                width: 595px;
                height: 673px;
                position: absolute;
                top: 29px6
                left: 720px;
                border-radius: 10px 190px 10px 190px;
            "
        />
    </div>
</main>



