<script lang="ts">
  export let appointments;
  export let branchName;

  import { getFormattedDate, getFormattedTime } from "../date";
   
</script>

<box class="box">
<h1 class="title">Scheduled Appointments</h1>

{#if appointments.length > 0}
<table class="table is-fullwidth">
    <thead>
    <tr>
      <th><appr title="ID">ID</appr></th>
      <th><appr title="Branch Name"> Branch</appr></th>
      <th><appr title="Date"> Date</appr></th>
      <th><appr title="Time">Time</appr></th>
    </tr>
  </thead>
  <tbody>
    {#each appointments as appointment}
    <tr>
        <td>
          {appointment.appointment_id}
        </td>
        <td>
          {branchName}
        </td>
        <td>
          {getFormattedDate(appointment.appointment_date)}
        </td>
        <td>
          {getFormattedTime(appointment.appointment_date)}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
{:else}
<div class="buttons is-centered">
    <div class="button">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path
                fill="#34D128"
                d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
              />
            </svg>
          </span>
          <p>Schedule an Appointment</p>
  </div>
</div>

{/if}

</box>
