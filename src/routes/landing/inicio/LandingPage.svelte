<script context="module" lang="ts">
  import { goto } from '$app/navigation'
</script>

<script lang="ts">
  import Navlanding from '$lib/components/nav-landing/Navlanding.svelte'
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
  export let handleClick: () => void = () => {}

  const Login = '/'
</script>

<Navlanding />

<section class="mt-8 flex flex-row items-start justify-end bg-white">
  <div class="ml-8 mt-4 flex w-full flex-col">
    <div class="relative h-[355px] w-full">
      <div class="h-[360px] w-[484px]">
        <h1 class="ml-12 mt-24 font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black">
          BIENVENIDO A LA PLATAFORMA
          <br />ULINK<br />
        </h1>
        <h1
          class="ml-12 mt-1 font-['Poppins'] text-[40px] font-normal leading-[59.80px] text-black"
        >
          CONECTANDO EGRESADOS Y
          <br />EMPRESAS<br />
        </h1>
        <h3
          class="ml-12 mt-4 h-[200px] w-[420px] font-['Poppins'] text-[12px] font-normal leading-normal"
        >
          Un espacio donde los egresados pueden encontrar<span class="font-bold"
            >aumenta tus oportunidades de empleo.</span
          >
          y donde las empresas puedan descubrir talento excepcional. Con nuestra red de conexiones facilitamos
          la
          <span class="font-bold"> interacción entre profesionales calificados y reclutadores</span>
          en busca de habilidades sobresalientes. Únete a ULINK y descubre un
          <span class="font-bold"> mundo de posibilidades profesionales.</span>
        </h3>
        <h3
          class="ml-[48px] mt-[-80px] h-[200px] w-[420px] font-['Poppins'] text-[12px] font-normal leading-normal"
        >
          Puedes empezar a buscar un egresado, utilizando nuestra catálogo.
        </h3>
        <div class="mr-[-60px] mt-[-115px] flex justify-end">
          <div class="flex justify-between">
            <button
              class="inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] bg-ucab-green px-[16px] py-[19px] shadow focus:outline-none"
              on:click|preventDefault={() => handleClick()}
            >
              <div class="font-['Open Sans'] text-[15px] font-bold leading-snug text-brand-white">
                IR A CATALOGO
              </div>
            </button>

            <button
              class="ml-4 mr-6 inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-brand-white px-[16px] py-[19px] shadow transition focus:outline-none"
              on:click|preventDefault={() => goto(Login)}
            >
              <div class="font-['Open Sans'] text-[15px] font-bold leading-snug text-ucab-black">
                INICIAR SESION
              </div>
            </button>
          </div>
        </div>
        <h1
          class="ml-[20px] mt-[85px] h-[72px] w-[1183px] text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
        >
          Nuestros beneficios a reclutadores y egresados
        </h1>
        <h1
          class="absolute ml-[30px] mt-[1280px] h-[72px] w-[1183px] text-center font-['Poppins'] text-[40px] font-bold leading-[59.80px] text-black"
        >
          Nuestro objetivo como producto
        </h1>
        <img
          class="absolute left-[950px] top-[36px] mt-[2100px] h-[49px] w-[52px]"
          alt=""
          src={star2}
        />
        <img
          class="absolute left-[240px] top-[36px] mt-[2100px] h-[49px] w-[52px]"
          alt=""
          src={star2}
        />
        <img
          class="absolute left-[70px] top-[36px] mt-[750px] h-[49px] w-[52px]"
          alt=""
          src={star2}
        />
        <img
          class="absolute left-[1100px] top-[36px] mt-[750px] h-[49px] w-[52px]"
          alt=""
          src={star2}
        />
        <img
          class="absolute left-[-20px] top-[36px] mt-[180px] h-[55px] w-[52px]"
          alt=""
          src={star1}
        />
        <img
          class="absolute left-[250px] top-[36px] mt-[370px] h-[40px] w-[52px]"
          alt=""
          src={star3}
        />
        <img
          class="absolute left-[230px] top-[36px] mt-[20px] h-[40px] w-[52px]"
          alt=""
          src={star3}
        />

        <div class=" top-[32px] ml-[90px] mt-[40px]">
          <img class="absolute h-[340px] w-[460px] rounded-[10px]" alt="" src={ucab2} />
        </div>

        <h3
          class="ml-[100px] mt-[900px] h-[373px] w-[600px]"
          style="text-align: justify; position: absolute; top: 0; right: 50px;"
        >
          Como reclutador. podrás disfrutar de una interfaz intuitiva con herramientas fáciles de
          usar que simplifican el proceso de búsqueda y reclutamiento a través de un catálogo de
          egresados de la Universidad Católica Andrés Bello (UCAB) altamente cualificados que se
          ajusten a tus requisitos como habilidades, experiencia y ubicación. ¡Visita sus perfiles y
          descarga sus CV! Cabe destacar que la UCAB ocupa el puesto #3 como la mejor institución
          del país, según la prestigiosa clasificación de Quacquarelli Symonds
        </h3>
        <h3 class="absolute ml-[46px] mt-[400px] h-[373px] w-[600px]" style="text-align: justify;">
          Como egresado, podrás crear tu perfil profesional personalizado que muestre tus
          habilidades, formación y experiencia de manera atractiva para los reclutadores; cargando
          toda la información relevante que te ayude a crear tu CV. Para mayor comodidad, nuestra
          plataforma se integra con Ellucian y Banner, por lo tanto ¡Ya tendrás información
          previamente cargada!
        </h3>
        <h3 class="absolute ml-[580px] mt-[800px] h-[373px] w-[600px]" style="text-align: justify;">
          Entendemos que nuestros egresados se especializan en diversas áreas y han cursado
          distintas carreras. Es por esta diversidad que se hace necesario crear CV específicos para
          diferentes campos laborales. Es aquí donde ULink se destaca, ofreciéndote la posibilidad
          de gestionar una amplia colección de CV, cada uno adaptado al área que buscas y resaltando
          tus habilidades específicas.
        </h3>
        <h3
          class="absolute ml-[35px] mt-[1330px] h-[72px] w-[1183px] text-center font-['Poppins'] text-[16px] font-semibold leading-normal text-black"
        >
          “Queremos guiar a nuestros egresados a que tengan la mejor oportunidad de empleo es por
          esto que nos enfocamos en la creación de nuevas herramientas para sus CV ”
        </h3>
        <div class="absolute top-[32px] ml-[720px] mt-[1270px]">
          <img class=" h-[340px] w-[460px] rounded-[10px]" alt="" src={ucab3} />
        </div>
        <div class="absolute top-[32px] ml-[80px] mt-[1660px]">
          <img class=" h-[340px] w-[460px] rounded-[10px]" alt="" src={ucab4} />
        </div>
        <button
          class="absolute ml-[780px] mt-[220px] inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-ucab-green px-[16px] py-[19px] shadow focus:outline-none"
          on:click|preventDefault={() => handleClick()}
        >
          <div class="font-['Open Sans'] text-[15px] font-bold leading-snug text-brand-white">
            IR AL CATALOGO
          </div>
        </button>
        <button
          class="absolute ml-[200px] mt-[600px] inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-brand-white px-[16px] py-[19px] shadow focus:outline-none"
          on:click|preventDefault={() => goto(Login)}
        >
          <div class="font-['Open Sans'] text-[15px] font-bold leading-snug text-ucab-black">
            INICIAR SESION
          </div>
        </button>
        <button
          class="absolute ml-[780px] mt-[1050px] inline-flex h-[61px] w-[229px] items-center justify-center gap-2.5 rounded-[10px] border-2 bg-ucab-green px-[16px] py-[19px] shadow focus:outline-none"
          on:click|preventDefault={() => handleClick()}
        >
          <div class="font-['Open Sans'] text-[15px] font-bold leading-snug text-brand-white">
            COLECCION DE CV
          </div>
        </button>
      </div>
    </div>
  </div>

  <div class="absolute left-[600px] top-[36px] mt-[100px]">
    <img class="h-[671px] w-[601px]" alt="" src={ucab1} />
  </div>
  <div class="absolute mt-[2500px] flex h-[280px] w-[1400px] justify-end bg-ucab-green">
    <h1
      class="ml-36 mt-14 w-[1280px] text-center font-['Poppins'] text-[30px] font-bold leading-[52px] text-white"
    >
      GRACIAS POR SU VISITA <br />¡HASTA PRONTO!
    </h1>
    <h3
      class="absolute mr-8 mt-[170px] h-[72px] w-[1183px] text-center font-['Poppins'] text-[14px] font-normal leading-normal text-brand-white"
    >
      Todos los derechos reservados 2024
    </h3>
    <img
      class="absolute left-[680px] top-[36px] mt-[170px] h-[49px] w-[52px]"
      alt=""
      src={instagramIcon}
    />
    <img
      class="absolute left-[750px] top-[36px] mt-[170px] h-[49px] w-[52px]"
      alt=""
      src={twitterIcon}
    />
    <img
      class="absolute left-[820px] top-[36px] mt-[170px] h-[49px] w-[52px]"
      alt=""
      src={facebookIcon}
    />
  </div>
</section>
