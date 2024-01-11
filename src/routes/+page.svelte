<script lang="ts">
  import { goto } from '$app/navigation'

  import LandingNavbar from './LandingNavbar.svelte'

  import ucab1 from '$lib/images/ucab1.png'
  import ucab2 from '$lib/images/ucab2.png'
  import ucab3 from '$lib/images/ucab3.png'
  import ucab4 from '$lib/images/ucab4.png'
  import star2 from '$lib/icons/star2.svg'
  import star1 from '$lib/icons/star1.svg'
  import star3 from '$lib/icons/star3.svg'
  import instagramIcon from '$lib/icons/instagram.svg'
  import twitterIcon from '$lib/icons/twitter.svg'
  import facebookIcon from '$lib/icons/facebook.svg'
</script>

<LandingNavbar />

<main class="mx-auto mt-12 flex flex-col items-center gap-24">
  <section class="flex w-full max-w-[1250px] justify-between px-5">
    <div class="items-left flex w-full max-w-[700px] flex-col">
      <h1 class="font-['Poppins'] text-[40px] font-bold uppercase leading-[59.80px] text-black">
        BIENVENIDO A LA <br /> PLATAFORMA <br /> ULINK <br /><span
          class="mt-1 font-['Poppins'] text-[40px] font-normal leading-[59.80px] text-black"
          >CONECTANDO <br /> EGRESADOS Y
          <br />EMPRESAS<br />
        </span>
      </h1>
      <p class="mt-2 h-[200px] w-[420px] font-['Poppins'] text-base font-normal leading-normal">
        Un espacio donde los egresados pueden encontrar <span class="font-bold"
          >oportunidades emocionantes</span
        >
        y donde las empresas puedan descubrir talento excepcional. Con nuestra red de conexiones facilitamos
        la
        <span class="font-bold"> interacción entre profesionales calificados y reclutadores</span>
        en busca de habilidades sobresalientes. Únete a ULINK y descubre un
        <span class="font-bold"> mundo de posibilidades profesionales.</span>
      </p>
      <p>Puedes empezar a buscar un egresado utilizando nuestro catálogo.</p>

      <div class="mt-10 flex justify-start gap-3">
        <a
          href="/catalogue"
          class="font-['Open Sans'] inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] bg-ucab-green px-[16px] py-[19px] text-[15px] font-bold uppercase leading-snug text-brand-white shadow focus:outline-none"
        >
          IR A CATALOGO
        </a>

        <a
          href="/login"
          class="font-['Open Sans'] mr-6 inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-brand-white px-[16px] py-[19px] text-[15px] font-bold uppercase leading-snug text-ucab-black shadow transition focus:outline-none"
        >
          INICIAR SESION
        </a>
      </div>
    </div>

    <img src={ucab1} alt="Imágen de la UCAB" class="h-[671px] w-[601px]" />
  </section>

  <section class="flex w-full flex-col items-center gap-16 px-8">
    <h2
      id="benefits"
      class="text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
    >
      Nuestros beneficios a reclutadores y egresados
    </h2>
    <div class="flex w-full max-w-[1400px] items-center justify-evenly gap-6">
      <img
        class="mb-20 max-h-[419px] w-full max-w-[683px] flex-grow rounded-[10px] object-cover object-center"
        alt="Imágen de la UCAB"
        src={ucab2}
      />
      <div class="flex flex-col items-center gap-5">
        <p
          class="max-w-[551px] font-['Poppins'] text-[20px] font-medium leading-[37.50px] text-black"
        >
          Como reclutador, podrás disfrutar de una interfaz intuitiva con herramientas fáciles de
          usar que simplifican el proceso de búsqueda y reclutamiento a través de un catálogo de
          egresados de la Universidad Católica Andrés Bello (UCAB) altamente cualificados que se
          ajusten a tus requisitos como habilidades, experiencia y ubicación. ¡Visita sus perfiles y
          descarga sus CV! Cabe destacar que la UCAB ocupa el puesto #3 como la mejor institución
          del país, según la prestigiosa clasificación de Quacquarelli Symonds.
        </p>
        <a
          href="/catalogue"
          class="font-['Open Sans'] h-[61px] w-[229px] items-center justify-center rounded-[10px] border-2 bg-ucab-green px-[16px] py-[19px] text-center text-[15px] font-bold uppercase leading-snug text-brand-white shadow focus:outline-none"
        >
          IR AL CATÁLOGO
        </a>
      </div>
    </div>
  </section>

  <section class="flex w-full flex-col items-center gap-16 px-8">
    <div class="flex w-full max-w-[1400px] flex-row-reverse items-center justify-evenly gap-6">
      <img
        class="mb-28 max-h-[419px] w-full max-w-[683px] flex-grow rounded-[10px] object-cover object-center"
        alt="Imágen de la UCAB"
        src={ucab3}
      />
      <div class="flex flex-col items-center gap-5">
        <p
          class="max-w-[551px] font-['Poppins'] text-[20px] font-medium leading-[37.50px] text-black"
        >
          Como egresado, podrás crear tu perfil profesional personalizado que muestre tus
          habilidades, formación y experiencia de manera atractiva para los reclutadores; cargando
          toda la información relevante que te ayude a crear tu CV. Para mayor comodidad, nuestra
          plataforma se integra con Ellucian y Banner, por lo tanto ¡Ya tendrás información
          previamente cargada!
        </p>
        <a
          href="/login"
          class="font-['Open Sans'] h-[61px] w-[229px] items-center justify-center rounded-[10px] border-2 bg-brand-white px-[16px] py-[19px] text-center text-[15px] font-bold uppercase leading-snug text-black shadow focus:outline-none"
        >
          INICIAR SESIÓN
        </a>
      </div>
    </div>
  </section>

  <section class="flex w-full flex-col items-center gap-16 px-8">
    <div class="flex w-full max-w-[1400px] items-center justify-evenly gap-6">
      <img
        class="mb-16 max-h-[419px] w-full max-w-[683px] flex-grow rounded-[10px] object-cover object-center"
        alt="Imágen de la UCAB"
        src={ucab4}
      />
      <div class="flex flex-col items-center gap-5">
        <p
          class="max-w-[551px] font-['Poppins'] text-[20px] font-medium leading-[37.50px] text-black"
        >
          Como egresado, podrás crear tu perfil profesional personalizado que muestre tus
          habilidades, formación y experiencia de manera atractiva para los reclutadores; cargando
          toda la información relevante que te ayude a crear tu CV. Para mayor comodidad, nuestra
          plataforma se integra con Ellucian y Banner, por lo tanto ¡Ya tendrás información
          previamente cargada!
        </p>
        <a
          href="/profile/me/cv"
          class="font-['Open Sans'] h-[61px] w-[229px] items-center justify-center rounded-[10px] border-2 bg-ucab-green px-[16px] py-[19px] text-center text-[15px] font-bold uppercase leading-snug text-brand-white shadow focus:outline-none"
        >
          COLECCIÓN DE CV
        </a>
      </div>
    </div>
  </section>

  <section class="flex w-full flex-col items-center gap-16 px-8">
    <h2
      id="goals"
      class="text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
    >
      Nuestro objetivo como producto
    </h2>
    <p
      class="w-full max-w-[1183px] text-center font-['Poppins'] text-[25px] font-medium leading-[37.50px] text-black"
    >
      “ Nuestra plataforma está diseñada para facilitar la interacción entre egresados y empresas,
      fomentando el crecimiento profesional y la colaboración mutuamente beneficiosa. Queremos guiar
      a los egresados a que tengan la mejor oportunidad de empleo, es por esto que nos enfocamos en
      la creación de nuevas herramientas para sus CV ”
    </p>
  </section>

  <footer class="flex w-full flex-col items-center bg-ucab-green pb-12 pt-10 text-brand-white">
    <h3 class="text-[40px] uppercase">GRACIAS POR SU VISITA</h3>
    <h3 class="text-[40px] uppercase">¡HASTA PRONTO!</h3>
    <p class="mt-3 text-[20px]">Todos los derechos reservado 2024</p>
    <div class="mt-3 flex gap-5">
      <a href="https://www.instagram.com/enlaucab" target="_blank"
        ><img src={instagramIcon} alt="Ir a el instagram de la UCAB" /></a
      >
      <a href="https://twitter.com/enlaucab" target="_blank"
        ><img src={twitterIcon} alt="Ir a el twitter de la UCAB" /></a
      >
      <a href="https://www.facebook.com/enlaUCAB" target="_blank"
        ><img src={facebookIcon} alt="Ir a el facebook de la UCAB" /></a
      >
    </div>
  </footer>
</main>
