<script lang="ts">
  import Logo from '$lib/icons/logo.svg'
</script>

<header class="flex w-full justify-center">
  <nav
    class="mb-0 flex w-full max-w-[1440px] items-center justify-start rounded-[5px] bg-white p-3 pl-6"
  >
    <img class="h-[65px] w-[167px]" alt="" src={Logo} />
    <ul
      class="flex-grow-1 flex w-full justify-around text-center [&>li>a]:py-5 [&>li>a]:text-center [&>li]:min-w-[150px]"
    >
      <li class="min-w-[150px]">
        <a
          href="#benefits"
          class="relative h-[37px] w-[275px] text-center font-poppins text-xl font-bold leading-[37s.50px] text-black"
        >
          Beneficios
        </a>
      </li>
      <li class="min-w-[150px]">
        <a
          href="#goals"
          class="relative h-[37px] w-[275px] text-center font-poppins text-xl font-bold leading-[37s.50px] text-black"
        >
          Objetivos
        </a>
      </li>
      <li class=" min-w-[150px]">
        <a
          href="/login"
          class="relative h-[37px] w-[275px] text-center font-poppins text-xl font-bold leading-[37s.50px] text-black"
        >
          Iniciar sesion
        </a>
      </li>
    </ul>
  </nav>
</header>
