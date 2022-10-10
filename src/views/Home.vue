<script>
import axios from "axios";

export default {
  data() {
    return {
      test: "",
      data: [],
      games: [],
    };
  },

  methods: {
    async getGames() {
      const payload = {
        params: {
          market: "classic",
          iso_date: "2022-08-01",
          federation: "UEFA",
        },
        headers: {
          "X-RapidAPI-Key":
            "68a17b08dbmshe68484fe4f7905bp16ece9jsn2069f40c2728",
          "X-RapidAPI-Host": "football-prediction-api.p.rapidapi.com",
        },
      };
      const url =
        "https://football-prediction-api.p.rapidapi.com/api/v2/predictions";
      await axios
        .get(url, payload)
        .then((response) => {
          console.log(this.test);
          console.log(response.data.data);
          this.games = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getGames();
  },
};
</script>

<template>
  <div class="col-md-3">
    <button
      v-if="canRefresh"
      @click="getServers"
      type="button"
      class="btn btn-success btn-sm"
    >
      <i class="fas fa-sync-alt"></i>
    </button>
    <button v-else type="button" class="btn btn-success btn-sm" disabled>
      <i class="fas fa-spin fa-sync-alt"></i>
    </button>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th>Host</th>
          <th>Action</th>
          <th>PID</th>
          <th>Command</th>
          <th>Arguments</th>
          <th>PPID</th>
        </tr>
      </thead>
      <tbody v-if="servers && servers.length > 0">
        <tr
          v-for="server of servers"
          :key="server.pid"
          :class="server.status === 'up' ? 'table-success' : 'table-danger'"
        >
          <td class="align-middle">
            {{ games.away_team }}<br />
            <span class="small">{{ server.address }}</span>
          </td>
          <td class="align-middle">
            <template v-if="!server.reachable">
              <span class="text-danger"
                ><i class="fas fa-satellite-dish"></i> Offline</span
              >
            </template>
            <template v-else>
              <template v-if="server.status === 'down'">
                <button
                  v-if="server.starting"
                  class="btn btn-success btn-sm"
                  disabled
                >
                  <i class="fas fa-play"></i>
                </button>
                <button
                  v-else
                  class="btn btn-success btn-sm"
                  @click="startServer(server)"
                >
                  <i class="fas fa-play"></i>
                </button>
              </template>
              <template v-else>
                <template v-if="server.stopping">
                  <button class="btn btn-warning btn-sm" disabled>
                    <i
                      v-if="server.restarting"
                      class="fas fa-spin fa-sync-alt"
                    ></i>
                    <i v-else class="fas fa-sync-alt"></i>
                  </button>
                  <button class="btn btn-danger btn-sm mx-2" disabled>
                    <i class="fas fa-stop"></i>
                  </button>
                </template>
                <template v-else>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="restartServer(server)"
                  >
                    <i class="fas fa-sync-alt"></i>
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="stopServer(server)"
                  >
                    <i class="fas fa-stop"></i>
                  </button>
                </template>
              </template>
            </template>
          </td>
          <td class="align-middle">{{ server.pid }}</td>
          <td class="align-middle">{{ server.command }}</td>
          <td class="align-middle">{{ server.arguments }}</td>
          <td class="align-middle">{{ server.ppid }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-if="canRefresh">
          <td colspan="6">No host found</td>
        </tr>
        <tr v-else>
          <td colspan="6">Fetching data...</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div >
    <button v-on:click="getGames">test</button>
  </div>
  <b-container>
    
  </b-container>
  <!-- <h1>Home Page</h1> -->
</template>
