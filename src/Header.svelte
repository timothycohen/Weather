<script>
  import InputForm from './InputForm.svelte';
  import CityLabel from './CityLabel.svelte';
  import Switch from './Switch.svelte';
</script>

<div class="header">
  <CityLabel />
  <div class="header__right">
    <InputForm />
    <Switch />
  </div>
</div>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    background-color: white;
    margin-bottom: 1rem;
  }

  .header__right {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
  }

  @media only screen and (max-width: 500px) {
    .header {
      flex-wrap: wrap;
    }
  }
</style>
