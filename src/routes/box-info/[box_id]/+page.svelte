<script lang="ts">
  import Payment from "../../../widgets/payment.svelte";
  import PaymentHistory from "../../../widgets/payment-history.svelte";
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
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
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
          <span class="icon has-text-success">
            <i class="fa fa-unlock fa-lg" aria-hidden="true"></i>
          </span>
          <p>Open</p>
        </div>
        <div class="button is-ghost">
          <span class="icon has-text-success">
            <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
          </span>
          <p>Schedule</p>
        </div>
        <div class="button is-ghost">
          <span class="icon has-text-success">
            <i class="fa fa-users fa-lg" aria-hidden="true"></i>
          </span>
          <p>Transfer Box</p>
        </div>
      </div>
      <article class="message is-large">
        <div class="message-header"></div>
        <div class="message-body">
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
      </article>
      <Users authorizedUsers={data.authorizedUsers} />
      <Payment boxInfo={data.box} paymentInfo={data.payment}></Payment>
      <PaymentHistory paymentHistory={data.paymentHistory} />
      <History boxHistory={data.boxHistory} />
      <Schedule appointments={data.appointment} branchName={branch}></Schedule>
    </div>
  </div>
</div>
