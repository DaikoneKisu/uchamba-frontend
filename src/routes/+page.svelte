<script lang="ts">
  import LandingNavbar from './LandingNavbar.svelte'

  import ucab1 from '$lib/images/ucab1.jpeg'
  import ucab2 from '$lib/images/ucab2.png'
  import ucab3 from '$lib/images/ucab3.jpeg'
  import ucab4 from '$lib/images/ucab4.jpeg'
  import ucab5 from '$lib/images/ucab5.png'
  import instagramIcon from '$lib/icons/instagram.svg'
  import twitterIcon from '$lib/icons/twitter.svg'
  import facebookIcon from '$lib/icons/facebook.svg'
  import MagicText from '$lib/components/text/magic-text/MagicText.svelte'
  import MagicStars from '$lib/components/decoration/magic-stars/MagicStars.svelte'
</script>

<LandingNavbar />

<main class="mx-auto mt-12 flex flex-col items-center gap-24">
  <section class="flex w-full max-w-[1250px] justify-between px-5">
    <div class="items-left flex w-full max-w-[700px] flex-col">
      <MagicStars color="#FFD200">
        <h1 class="font-['Poppins'] text-[40px] font-bold uppercase leading-[2.7rem] text-black">
          BIENVENIDO A LA <br /> PLATAFORMA <br />
          <MagicText>ULINK</MagicText> <br /><span
            class="mt-1 font-['Poppins'] text-[40px] font-normal leading-3 text-black"
            >CONECTANDO <br /> EGRESADOS Y
            <br />EMPRESAS<br />
          </span>
        </h1>
      </MagicStars>
      <p class="mt-5 w-[420px] font-['Poppins'] text-lg font-normal leading-normal">
        Un espacio donde los egresados pueden encontrar <span class="font-bold"
          >oportunidades emocionantes</span
        >
        y donde las empresas puedan descubrir talento excepcional.
      </p>
      <p class="mt-4 w-[420px] font-['Poppins'] text-lg">
        Únete a ULINK y descubre un
        <span class="font-bold"> mundo de posibilidades profesionales.</span>
      </p>
      <p class="mt-5 w-[420px] font-bold">
        Puedes empezar a buscar un egresado utilizando nuestro catálogo.
      </p>

      <div class="mt-10 flex justify-start gap-3">
        <a
          href="/catalogue"
          class="font-['Open Sans'] inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] bg-ucab-green px-[16px] py-[19px] text-[15px] font-bold uppercase leading-snug text-brand-white shadow focus:outline-none"
        >
          IR A CATÁLOGO
        </a>

        <a
          href="/login"
          class="font-['Open Sans'] mr-6 inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-brand-white px-[16px] py-[19px] text-[15px] font-bold uppercase leading-snug text-ucab-black shadow transition focus:outline-none"
        >
          INICIAR SESIÓN
        </a>
      </div>
    </div>

    <img src={ucab1} alt="Imágen de la UCAB" class="h-[671px] w-[601px] rounded-[10px]" />
  </section>

  <section class="flex w-full flex-col items-center gap-16 px-8">
    <MagicStars color="#41B4E5">
      <h2
        id="benefits"
        class="text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
      >
        Nuestros beneficios a reclutadores y egresados
      </h2>
    </MagicStars>
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
          descarga sus CV! Cabe destacar que la UCAB ocupa el puesto #1 como la mejor institución
          del país, según el QS World University Ranking 2024.
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
          Entendemos que nuestros egresados se especializan en diversas áreas y han cursado
          distintas carreras. Es por esta diversidad que se hace necesario crear CV específicos para
          diferentes campos laborales. Es aquí donde ULink se destaca, ofreciéndote la posibilidad
          de gestionar una amplia colección de CV, cada uno adaptado al área que buscas y resaltando
          tus habilidades específicas.
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
    <MagicStars color="#007934">
      <h2
        id="goals"
        class="text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
      >
        Nuestro objetivo como producto
      </h2>
    </MagicStars>
    <p
      class="w-full max-w-[1183px] text-center font-['Poppins'] text-[25px] font-medium leading-[37.50px] text-black"
    >
      “ Nuestra plataforma está diseñada para facilitar la interacción entre egresados y empresas,
      fomentando el crecimiento profesional y la colaboración mutuamente beneficiosa. Queremos guiar
      a los egresados a que tengan la mejor oportunidad de empleo, es por esto que nos enfocamos en
      la creación de nuevas herramientas para sus CV ”
    </p>
  </section>

  <img src={ucab5} alt="Imágen de la UCAB" class="max-w-[884px] rounded-[10px]" />

  <footer
    class="flex w-full flex-col items-center overflow-hidden bg-ucab-green pb-6 pt-10 text-brand-white"
  >
    <h3 class="text-[40px] uppercase">GRACIAS POR SU VISITA</h3>
    <h3 class="text-[40px] uppercase">¡HASTA PRONTO!</h3>
    <p class="mt-3 text-[20px]">Todos los derechos reservado 2024</p>
    <div class="mt-3 flex gap-5">
      <a href="https://www.instagram.com/ucabguayana/" target="_blank"
        ><img src={instagramIcon} alt="Ir a el instagram de la UCAB" /></a
      >
      <a href="https://twitter.com/UcabGuayana/" target="_blank"
        ><img src={twitterIcon} alt="Ir a el twitter de la UCAB" /></a
      >
      <a href="https://www.facebook.com/UCABExtensionGuayana/" target="_blank"
        ><img src={facebookIcon} alt="Ir a el facebook de la UCAB" /></a
      >
    </div>

    <div
      class="group relative mt-8 w-full overflow-hidden whitespace-nowrap before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-ucab-green before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-ucab-green after:to-transparent"
    >
      <div
        class="inline-flex w-full animate-[scrolling_3s_linear_infinite] justify-around group-hover:[animation-play-state:paused] md:[animation-duration:5s] lg:[animation-duration:8s] xl:[animation-duration:12s] [&>span]:inline-block [&>span]:font-poppins [&>span]:text-xl [&>span]:font-bold"
      >
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
      </div>
      <div
        class="inline-flex w-full animate-[scrolling_3s_linear_infinite] justify-around group-hover:[animation-play-state:paused] md:[animation-duration:5s] lg:[animation-duration:8s] xl:[animation-duration:12s] [&>span]:inline-block [&>span]:font-poppins [&>span]:text-xl [&>span]:font-bold"
      >
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
        <span>UCAB Guayana</span>
        <span>·</span>
      </div>
    </div>
  </footer>
</main>
