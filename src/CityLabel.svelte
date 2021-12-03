<script>
  import { current, getForeignTime, getForeignDate} from './stores';

  const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

  $: city = $current.name
  $: country = regionNames.of($current.sys.country)
  $: foreignTime = getForeignTime($current.timezone/60, new Date());
  $: foreignDate = getForeignDate($current.timezone/60, new Date());

</script>

  <div class="cityLabel">
    <div class="cityLabel__city">{city}</div>
    <div class="details">
      <div class="details--country">{country}</div>
      <div class="details--dateTime">{foreignTime} {foreignDate}</div>
    </div>
  </div>

<style>
  *{
    padding: 0;
    margin: 0;
    color: var(--color__header);
  }

  .cityLabel{
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: .0625rem solid var(--color__header);
    gap: 0;
  }

  .cityLabel__city{
    text-align:center;
    font-size: 1.7rem;
    font-weight: 900;
  }

  .details{
    display: none;
    flex-direction: column;
    align-content: center;
    justify-items: center;
    font-size: .7rem;
    font-weight: 400;
    text-align: right;
}

  @media only screen and (min-width: 500px) {
    .cityLabel{ gap: 1rem; }
    .details{
      display: flex;
      min-width: 4.5rem;
    }
  }

  @media only screen and (min-width: 576px) {
    .cityLabel{ gap: 1.3rem; }
    .cityLabel__city{ font-size: 2.2rem; }
  }

  @media only screen and (min-width: 752px) {
    .cityLabel{ gap: 2rem; }
    .cityLabel__city{ font-size: 3rem; }
    .details{ font-size: 1.2rem;
      min-width: 8rem;
    }
  }
</style>
