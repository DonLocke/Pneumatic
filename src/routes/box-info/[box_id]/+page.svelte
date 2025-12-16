<script lang="ts">
  import Payment from "../../../widgets/payment.svelte";
  import Schedule from "../../../widgets/schedule.svelte";
  import History from "../../../widgets/history.svelte";
  import Users from "../../../widgets/users.svelte";
  export let data;

  const boxID = data.box.box_id;
  const boxNumber = data.box.box_number;
  const branch = data.box.branch_name;
  const address = data.box.branch_address;
</script>

<section class="hero is-primary">
  <div class="hero-body">
    <div class="title has-text-centered">{branch} Box #{boxNumber}</div>
  </div>
</section>

<nav class="breadcrumb ml-5 mt-5 is-medium">
  <ul>
    <li>
      <a href="/">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              fill="#34D128"
              d="M112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320zM576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320zM188.7 308.7C182.5 314.9 182.5 325.1 188.7 331.3L292.7 435.3C297.3 439.9 304.2 441.2 310.1 438.8C316 436.4 320 430.5 320 424L320 352L424 352C437.3 352 448 341.3 448 328L448 312C448 298.7 437.3 288 424 288L320 288L320 216C320 209.5 316.1 203.7 310.1 201.2C304.1 198.7 297.2 200.1 292.7 204.7L188.7 308.7z"
            />
          </svg>
        </span>
        Go Back
      </a>
    </li>
  </ul>
</nav>

<div class="container mt-5">
  <div class="columns is-centered">
    <div class="column is-four-fifths">
      <div class="buttons is-centered are-large">
        <div class="button is-ghost">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="#34D128"
                d="M416 160C416 124.7 444.7 96 480 96C515.3 96 544 124.7 544 160L544 192C544 209.7 558.3 224 576 224C593.7 224 608 209.7 608 192L608 160C608 89.3 550.7 32 480 32C409.3 32 352 89.3 352 160L352 224L192 224C156.7 224 128 252.7 128 288L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 288C512 252.7 483.3 224 448 224L416 224L416 160z"
              />
            </svg>
          </span>
          <p>Open</p>
        </div>
        <div class="button is-ghost">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="#34D128"
                d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
              />
            </svg>
          </span>
          <p>Schedule</p>
        </div>
        <div class="button is-ghost">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="#34D128"
                d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"
              />
            </svg>
          </span>
          <p>Cancel Box</p>
        </div>
      </div>
      <div class="box">
        <div class="grid">
          <div class="cell">
            <p class="title is-4">Branch</p>
            <p class="subtitle is-4">{branch}</p>
          </div>
          <div class="cell">
            <p class="title is-4">Address</p>
            <p class="subtitle is-4">{address}</p>
          </div>
        </div>
      </div>
      <Users authorizedUsers={data.authorizedUsers} />
      <Payment
        boxInfo={data.box}
        paymentInfo={data.payment}
        paymentHistory={data.paymentHistory}
      ></Payment>
      <History boxHistory={data.boxHistory} />
      <div class="box">
        <h1 class="title">Authorzed Users</h1>
        <p class="subtitle">Primary User: Foo Bar III</p>
        <p>Coming in widget?</p>
      </div>
      <Schedule appointments={data.appointment} branchName={branch}></Schedule>
    </div>
  </div>
</div>
