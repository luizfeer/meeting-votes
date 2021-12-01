<template>
  <div class="container">
    <v-col cols="12">
      <v-data-table
        :search="search"
        :headers="headers"
        :items="candidates"
        :items-per-page="10"
        class="elevation-1"
        :footer-props="{
        showFirstLastPage: true,
           'items-per-page-text':'Candidatos por página'
      }"
      >
        <template v-slot:top>
          <v-text-field v-model="search" label="Procurar" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{item.name}}</td>
            <td>{{item.votes}}</td>
            <td class="text-white text-center">
              <v-btn class="bg-green-600 text-white" icon dark @click="plus(item.id)">
                <v-icon class="text-white">mdi-plus</v-icon>
              </v-btn>
            </td>
            <td class="text-white text-center">
              <v-btn class="bg-yellow-600 text-white" icon dark @click="minus(item.id)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </td>
            <td class="text-white text-center">
              <v-btn class="bg-blue-300 text-white" icon dark @click="reset(item.id)">
                <v-icon>mdi-numeric-0-circle-outline</v-icon>
              </v-btn>
            </td>
            <td class="text-white text-center">
              <v-btn class="bg-red-600 text-white" icon dark @click="remove(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row align="center" justify="center">
        <v-col class="shrink" cols="12">
          <v-card>
            <v-tabs v-model="tab" background-color="accent-4" centered dark icons-and-text>
              <v-tabs-slider></v-tabs-slider>

              <v-tab>
                Cadastrar pessoas
                <v-icon>mdi-account-multiple-plus</v-icon>
              </v-tab>

              <v-tab>
                Configurações
                <v-icon>mdi-cog-outline</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-form v-model="valid" class="mt-4" ref="form">
                  <v-card elevation="2" class="pa-4">
                    <v-card-title>Cadastro de novos canditados</v-card-title>
                    <v-row justify="center" class="ma-6">
                      <v-col cols="10" sm="12">
                        <v-text-field
                          v-model="form.name"
                          :rules="nameRules"
                          :counter="24"
                          label="Nome do candidato"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="pl-10 flex items-center justify-between" cols="10" sm="12">
                        <v-checkbox v-model="one" label="Cadastrar com 1 voto"></v-checkbox>
                        <v-btn
                          :disabled="!valid"
                          color="success"
                          class="mb-4"
                          @click="saveCandidate"
                        >Cadastrar</v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-form>
              </v-tab-item>
              <v-tab-item>
                <v-card flat class="p-4 pt-10">
                  <v-row align="center" justify="center">
                    <v-col class="pl-10 flex items-center justify-between" cols="2" sm="6">
                      <v-text-field
                        v-model="quorum"
                        label="Quórum presente"
                        type="number"
                        class="w-10"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="pl-10 flex items-center justify-between" cols="2" sm="6">
                      <v-switch
                        v-model="reverse"
                        :label="`Ordenação: ${reverse ? 'maior': 'menor'}`"
                      ></v-switch>
                    </v-col>
                    <v-row>
                      <v-col class="pl-10 flex items-center justify-between" cols="12">
                        <v-switch
                          v-model="streaming"
                          :label="`Modo streaming: ${streaming ? 'ativado': 'desativado'}`"
                        ></v-switch>
                      </v-col>
                      <div v-if="streaming">
                        <v-card-title>Cor do chromaKey</v-card-title>
                        <v-col class="pl-10 flex items-center justify-between" cols="12">
                          <v-color-picker
                            v-model="bgColor"
                            dot-size="25"
                            mode="hexa"
                            swatches-max-height="200"
                          ></v-color-picker>
                        </v-col>
                      </div>
                    </v-row>
                    <v-col class="pl-6" cols="6" sm="12">
                      <v-card-title>Largura dos balões</v-card-title>
                      <v-card-text>
                        <v-slider v-model="width" step="10" thumb-label ticks></v-slider>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
// import mapMutations from "vuex";
export default {
  data() {
    return {
      bgColor: null,
      tab: null,
      search: '',
      quorum: 0,
      width: 100,
      one: false,
      valid: true,
      expand: false,
      reverse: true,
      streaming: false,
      form: {
        id: 0,
        name: '',
        position: 0,
        votes: 0,
      },
      nameRules: [
        (v) => !!v || 'Preencha o nome do candidato',
        (v) => (v && v.length <= 24) || 'O nome deve ter no máximo 24 letras.',
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Votos',
          align: 'start',
          value: 'votes',
        },
        {
          text: 'Adicionar voto',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Remover voto',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Zerar',
          sortable: false,
          align: 'center',
        },
        {
          text: 'Excluir',
          sortable: false,
          align: 'center',
        },
      ],
    };
  },
  methods: {
    saveCandidate() {
      this.$store.commit('addCandite', { ...this.form });
      this.form.name = null;
    },
    plus(id) {
      const candidateKey = this.candidates.findIndex((x) => x.id === id);
      const candidate = this.candidates[candidateKey];
      candidate.votes += 1;
      this.$store.commit('saveEditedCandidate', { candidateKey, candidate });
    },
    minus(id) {
      const candidateKey = this.candidates.findIndex((x) => x.id === id);
      const candidate = this.candidates[candidateKey];
      candidate.votes -= 1;
      this.$store.commit('saveEditedCandidate', { candidateKey, candidate });
    },
    reset(id) {
      const candidateKey = this.candidates.findIndex((x) => x.id === id);
      const candidate = this.candidates[candidateKey];
      candidate.votes = 0;
      this.$store.commit('saveEditedCandidate', { candidateKey, candidate });
    },
    remove(id) {
      const candidateKey = this.candidates.findIndex((x) => x.id === id);
      this.$store.commit('removeCandite', candidateKey);
    },
  },
  computed: {
    candidates() {
      return this.$store.state.candidatesStore;
    },
    idIcremente() {
      if (this.candidates.length) {
        return parseFloat(this.candidates[this.candidates.length - 1].id) + 1;
      }
      return 0;
    },
  },
  watch: {
    one(newValue) {
      if (newValue) {
        this.form.votes = 1;
      } else {
        this.form.votes = 0;
      }
    },
    idIcremente() {
      this.form.id = this.idIcremente;
      this.form.position = this.idIcremente;
    },
    quorum(val) {
      this.$store.commit('setQuorum', val);
    },
    width(val) {
      this.$store.commit('setWidthMonitor', val);
    },
    reverse(val) {
      this.$store.commit('changeOrder', val);
    },
    streaming(val) {
      this.$store.commit('setStreaming', val);
    },
    bgColor(val) {
      this.$store.commit('setBgColor', val);
    },
  },
  mounted() {
    this.$vuetify.theme.dark = true;
    this.form.id = this.idIcremente;
    this.form.position = this.idIcremente;
    this.quorum = this.$store.state.quorum;
    this.width = this.$store.state.widthMonitor;
    this.streaming = this.$store.state.streaming;
  },
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
