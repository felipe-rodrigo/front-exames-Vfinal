<template>
  <q-page padding>
    <q-card round class="q-ma-md q-pa-lg">
      <div class="text-bold my-font text-h4 q-ma-md q-pb-md">
        Formulario de Exames
      </div>
      <q-form @submit="onSubmit" class="row q-col-gutter-lg">
        <q-select
          outlined
          rounded
          v-model="form.idMedico"
          class="col-lg-6 col-xs-12"
          label="Médico Responsável"
          :options="medicos"
          option-label="nome"
          option-value="idMedico"
          emit-value
          map-options
          lazy-rules
          :rules="[(val) => (val && val > 0) || 'Campo obrigatório']"
        />
        <q-select
          outlined
          rounded
          v-model="form.idPaciente"
          class="col-lg-6 col-xs-12"
          label="Paciente"
          :options="pacientes"
          option-label="nome"
          option-value="idPaciente"
          emit-value
          map-options
          lazy-rules
          :rules="[(val) => (val && val > 0) || 'Campo obrigatório']"
        />

        <q-input
          outlined
          rounded
          v-model="form.dataHoraExame"
          mask="##/##/####"
          class="col-lg-6 col-xs-12"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.dataHoraExame">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="col-lg-12 col-xs-12">
          <q-editor
            v-model="form.observacao"
            label="Observação"
            min-height="5rem"
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div label="Resultado" class="col-lg-12 col-xs-12">
          <q-editor
            v-model="form.resultado"
            min-height="5rem"
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <!-- <q-input
        outlined=""
        v-model="form.resultado"
        label="Resultado"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      /> -->
        <div class="col-12 q-gutter-md">
          <q-btn
            rounded
            label="Salvar"
            color="primary"
            class="float-right q-py-md"
            icon="fa-solid fa-check"
            type="submit"
          />
          <q-btn
            outline
            rounded
            label="Cancelar"
            color="primary"
            class="float-right q-py-md"
            icon="fa-solid fa-cancel"
            :to="{ name: 'exame-listar' }"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import exameService from "src/services/exameService";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import UseApi from "src/composables/UseApi";
import medicoService from "src/services/medicoService";
import pacienteService from "src/services/pacienteService";

export default defineComponent({
  name: "ExameForm",
  setup() {
    const { post, getById, update } = exameService(); // é realmente usado?
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const medicos = ref([]);
    const pacientes = ref([]);
    const form = ref({
      idMedico: "",
      idPaciente: "",
      dataHoraExame: "",
      observacao: "",
      resultado: "",
    });

    const FormatDate = (data) => {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0"); // O mês começa em 0 (janeiro é 0)
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    };

    onMounted(async () => {
      // if (route.params.id) {
      //   getPost(route.params.id)
      // }
      const id = route?.params?.id;
      if (id) {
        $q.loading.show();
        exameService("exames/listar")
          .getById(id)
          .then((data) => {
            form.value.idMedico = data.idMedico;
            form.value.idPaciente = data.idPaciente;
            form.value.dataHoraExame = FormatDate(new Date(data.dataHoraExame));
            form.value.observacao = data.observacao;
            form.value.resultado = data.resultado;
            $q.loading.hide();
          });
      }

      $q.loading.show();
      medicoService("medicos/listar")
        .list()
        .then((data) => {
          medicos.value = data;
          $q.loading.hide();
        });

      $q.loading.show();
      pacienteService("pacientes/listar")
        .list()
        .then((data) => {
          pacientes.value = data;
          $q.loading.hide();
        });
    });

    // const getPost = async (id) => {
    //   try {
    //     const response = await getById(id)
    //     form.value = response
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const onSubmit = async (id) => {
      // try {
      //   if (form.value.id) {
      //     await update(form.value)
      //   } else {
      //     await post(form.value)
      //   }
      //   $q.notify({ message: 'Salvo com sucesso', icon: 'check', color: 'positive' })
      //   router.push({ name: 'home' })
      // } catch (error) {
      //   console.error(error)
      // }

      try {
        if (id) {
          await UseApi("/exames/editar").update(form.value);
        } else {
          await UseApi("/exames/adicionar").post(form.value);
        }
        $q.notify({
          message: "Salvo com sucesso",
          icon: "check",
          color: "positive",
        });
        router.push({ name: "exame-listar" });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      route,
      medicos,
      pacientes, // não era retornado
      onSubmit,
    };
  },
});
</script>
