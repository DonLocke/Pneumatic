<script lang="ts">
  import { getFormattedDate, getFormattedTime } from "$lib/date";

  export let appointments;
  export let branchName;

</script>

<div class="message is-large">
  <div class="message-header">Scheduled Appointments</div>
  <div class="message-body">
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
          <span class="icon has-text-primary">
            <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
          </span>
          <p>Schedule an Appointment</p>
        </div>
      </div>
    {/if}
  </div>
</div>
