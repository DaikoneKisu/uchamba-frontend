<script lang="ts">
  import { scale, slide } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { page } from '$app/stores'

  import type { ProfileData } from '$lib/types/profile-data.type'
  import { cv } from './cv.store'
  import { getMonthName } from '$lib/utils/get-month-name'

  export let profileData: ProfileData

  function formatWorkExperienceEntryData(date: Date) {
    return `${getMonthName(date)} ${date.getFullYear()}`
  }
</script>

<div
  class="cv mx-[80px] my-[50px] min-h-[calc(27.94cm-50px)] w-[calc(21.59cm-80px)] md:max-w-lg lg:max-w-2xl"
>
  <header class="cv-header">
    <div class="cv-header__logo-container">
      <img
        class="cv-header__logo"
        src="https://www.ucab.edu.ve/wp-content/uploads/2019/04/Logo_UCAB_3.png"
        alt=""
        loading="eager"
      />
    </div>
    <div class="cv-header__info-container">
      <div class="cv-header__important-container">
        <h1 class="cv-header__important-text cv-header__important-text--title">
          {profileData.name}
        </h1>
        <h2 class="cv-header__important-text cv-header__important-text--subtitle">
          {$cv.name}
        </h2>
      </div>
      <div class="cv-header__additional-container">
        <p>
          {profileData.country} - {profileData.state} - {profileData.city}
        </p>
        <p>
          {profileData.residenceAddress}
        </p>
        <a href="mailto:{profileData.email}">{profileData.email}</a>
      </div>
    </div>
  </header>

  <hr class="section-divider section-divider--header" />

  <main class="cv-main">
    <section class="cv-section cv-section--work-experiences">
      <h3 class="cv-section__important-text">Experiencia Laboral</h3>
      <div>
        {#each $cv.entries.experiences.map( (id) => profileData.workExperiences.find((we) => we.workExpId === id) ) as we (we)}
          <article class="cv-article cv-article--work-experiences" transition:slide>
            <h4 class="cv-article__title">{we?.jobTitle}</h4>
            {#if we?.departureDate}
              <strong class="cv-article__important-text"
                >{we?.organizationName} • {formatWorkExperienceEntryData(
                  new Date(we?.entryDate)
                )} - {formatWorkExperienceEntryData(new Date(we?.departureDate))}</strong
              >
            {:else}
              <strong class="cv-article__important-text"
                >{we?.organizationName} • {formatWorkExperienceEntryData(
                  new Date(we?.entryDate ?? '')
                )} - Actualidad</strong
              >
            {/if}
            {#if we?.freelancer}
              <strong class="cv-article__important-text">Trabajador Autonómo</strong>
            {:else}
              <strong class="cv-article__important-text"
                >{we?.country} - {we?.state} - {we?.city} - {we?.address}</strong
              >
            {/if}
            <p>
              {we?.description}
            </p>
          </article>
        {/each}
      </div>
    </section>

    <hr class="section-divider" />

    <section class="cv-section">
      <h3 class="cv-section__important-text">Formación Académica</h3>
      <div class="cv-section cv-section--education">
        {#each profileData.education.filter((s) => (!s.universityName && $cv.entries.education.featured.includes(s.id)) || (s.universityName && $cv.entries.education.personal.includes(s.id))) as s (s.id + (s.universityName ?? 'XD'))}
          <article class="cv-article" transition:slide>
            <h4 class="cv-article__title cv-article__title--education">
              {s?.name} -
              <strong class="cv-article__title cv-article__important-text--education">
                {s?.degree}
              </strong>
            </h4>
            <p class="cv-article__important-text cv-article__important-text--education_place">
              {s?.universityName ?? 'Universidad Católica Andrés Bello'}
            </p>
            <p>
              {s?.graduationYear}
            </p>
          </article>
        {/each}
      </div>
    </section>

    <hr class="section-divider" />

    <section class="cv-section">
      <h3 class="cv-section__important-text">Habilidades</h3>
      <div class="flex">
        <section class="cv-section cv-section--skills">
          <h4 class="cv-section__important-text cv-section__important-text--subtitle">Blandas</h4>
          <ul class="cv-section__list cv-section__list--soft-skills">
            {#each $cv.entries.skills.soft as ss (ss)}
              <li transition:scale animate:flip={{ duration: 600 }}>{ss}</li>
            {/each}
          </ul>
        </section>
        <section class="cv-section cv-section--skills">
          <h4 class="cv-section__important-text cv-section__important-text--subtitle">Duras</h4>
          <ul class="cv-section__list cv-section__list--hard-skills">
            {#each $cv.entries.skills.hard as hs (hs)}
              <li transition:scale animate:flip={{ duration: 600 }}>{hs}</li>
            {/each}
          </ul>
        </section>
      </div>
    </section>

    <hr class="section-divider" />

    <section class="cv-section cv-section--languages">
      <h3 class="cv-section__important-text">Idiomas</h3>
      <ul class="cv-section__list cv-section__list--languages">
        {#each $cv.entries.languages.map( (id) => profileData.languages.find((lang) => lang.languageId === id) ) as l (l)}
          <li transition:scale animate:flip={{ duration: 600 }}>
            {l?.name} - {l?.proficientLevel === 'Native' ? 'Nativo' : l?.proficientLevel}
          </li>
        {/each}
      </ul>
    </section>
  </main>

  <footer class="cv-footer">
    <small class="cv-footer__text">
      Para más información, visita mi perfil en: <a
        href={`${$page.url.origin}/profile/${profileData.userId}`}
        target="_blank"
        class="cv-footer__text cv-footer__text--my-profile-link"
        >{$page.url.origin}/profile/{profileData.userId}</a
      >
    </small>
  </footer>
</div>

<style>
  /** This stylesheet was written following BEM class naming methodology (https://getbem.com) and utility classes */

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Raleway:wght@800;900&display=swap');

  /** General Styles */

  :root {
    --main-font-color: #58595b;
    --secondary-font-color: #000;
    --border-color: #41b4e5;

    --main-font-family: 'Open Sans', sans-serif;
    --secondary-font-family: 'Raleway', sans-serif;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  li,
  a,
  strong,
  small {
    color: var(--main-font-color);
    font-size: 12px;
    font-weight: 400;
    margin: 0;
  }

  .cv {
    font-family: var(--main-font-family);
    font-size: 10px;
    font-weight: 400;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 40px;
  }

  /** Flex */

  .flex {
    display: flex;
  }

  /** Section Divider */

  .section-divider {
    border: 2px solid var(--border-color);
    width: 80%;
    margin: 0;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .section-divider--header {
    margin-top: 0px;
    margin-bottom: -30px;
  }

  /** CV Header */

  .cv-header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .cv-header__logo-container {
    --size: 48px;
    margin-left: auto;
    width: var(--size);
    height: var(--size);
  }

  .cv-header__logo {
    width: 100%;
    height: 100%;
  }

  .cv-header__info-container {
    width: 80%;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .cv-header__important-text {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 3px;
  }

  .cv-header__important-text--title {
    margin-bottom: 5px;
    font-family: var(--secondary-font-family);
    font-size: 22px;
    font-weight: 900;
    color: var(--secondary-font-color);
    letter-spacing: 0.37px;
  }

  .cv-header__important-text--subtitle {
    opacity: 50%;
  }

  .cv-header__important-container {
    max-width: 60%;
  }

  .cv-header__additional-container {
    max-width: 40%;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /** CV Main */

  .cv-main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /** CV Section */

  .cv-section {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }

  .cv-section--education {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .cv-section--skills {
    display: block;
    grid-template-columns: unset;
    flex-basis: 50%;
  }

  .cv-section__important-text {
    color: var(--secondary-font-color);
    text-transform: uppercase;
    font-family: var(--secondary-font-family);
    font-weight: 800;
    letter-spacing: 3px;
    line-height: 142%;
  }

  .cv-section__important-text--subtitle {
    font-size: 14px;
    color: var(--main-font-color);
    letter-spacing: 0.37px;
    margin-bottom: 5px;
  }

  .cv-section__list {
    padding: 0;
    padding-left: 15px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .cv-section__list--soft-skills {
    grid-column: 1/2;
    grid-row: 2/3;
    list-style: disc;
  }

  .cv-section__list--hard-skills {
    grid-column: 2/3;
    grid-row: 2/3;
    list-style: disc;
  }

  .cv-section__list--languages {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    list-style: disc;
  }

  /** CV Article */

  .cv-article {
    width: 80%;
  }

  .cv-article--work-experiences {
    margin-bottom: 20px;
  }

  .cv-article--work-experiences:last-of-type {
    margin-bottom: 0px;
  }

  .cv-article__title {
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .cv-article__title--education {
    margin-bottom: 2px;
  }

  .cv-article__important-text {
    display: block;
    text-transform: capitalize;
    font-weight: 700;
    opacity: 90%;
  }

  .cv-article__important-text:last-of-type {
    margin-bottom: 3px;
  }

  .cv-article__important-text--education {
    font-size: 14px;
    display: inline;
    opacity: 100%;
  }

  .cv-article__important-text--education_place {
    text-transform: capitalize;
  }

  /** CV Footer */

  .cv-footer {
    margin-top: auto;
    align-self: center;
  }

  .cv-footer__text--my-profile-link {
    text-decoration: underline;
  }
</style>
