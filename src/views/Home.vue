<template>
  <v-container py-10>
    <!-- DataTable -->
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      class="elevation-1 py-3 px-5"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Listado de productos</v-toolbar-title>
          <v-spacer />
          <v-btn color="primary" @click="openCloseDialog">Crear producto</v-btn>
        </v-toolbar>

        <!-- Search box -->
        <v-col cols="12" sm="5" class="mb-4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="¿Desea buscar un producto?"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </template>

      <!-- Status column -->
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark>{{ getStatusText(item.status) }}</v-chip>
      </template>

      <!-- Actions column -->
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="updateProduct(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteProduct(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="550" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Creación de producto</span>
        </v-card-title>
        <v-container class="pa-6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.name]"
              label="Nombre del producto"
            />

            <v-row>
              <v-col cols="12" sm="3">
                <v-text-field v-model="quantity" label="Cantidad" type="number" min="0" />
              </v-col>

              <v-col cols="12" sm="9">
                <v-select :items="listStates" :rules="[rules.required]" label="Estado" />
              </v-col>
            </v-row>

            <v-select :items="listWarehouses" :rules="[rules.required]" label="Bodega" />

            <v-textarea v-model="remarks" label="Observaciones y/o comentarios" no-resize rows="3" />

            <v-row class="mt-6">
              <v-btn small text color="error" @click="openCloseDialog">Cancelar</v-btn>

              <v-spacer />
              <v-btn small text @click="clear">Limpiar</v-btn>
              <v-btn small @click="createProduct" color="primary">Crear</v-btn>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" :color="snackbarColor">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Producto",
        value: "name"
      },
      {
        text: "Bodega",
        value: "warehouse",
        filterable: false
      },
      {
        text: "Cantidad",
        value: "quantity",
        align: "right",
        filterable: false,
        align: "center"
      },
      {
        text: "Estado",
        value: "status",
        filterable: false,
        align: "center"
      },
      {
        text: "Gestión",
        value: "action",
        sortable: false,
        filterable: false,
        align: "center"
      }
    ],

    products: [
      {
        name: "Lorem 1",
        warehouse: "Lorem3",
        quantity: 3,
        status: false
      },
      {
        name: "Lorem 2",
        warehouse: "Lorem3",
        quantity: 5,
        status: true
      }
    ],
    id: "",
    name: "",
    quantity: 0,
    state: "",
    warehouse: "",
    status: true,

    valid: false,
    remarks: "",

    listWarehouses: [],
    listStates: [],

    rules: {
      required: value => !!value || "Este campo es requerido",
      name: value =>
        value.length > 4 || "El nombre debe contener al menos 5 carácteres"
    },

    dialog: false,

    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2500,
    snackbarColor: ""
  }),

  methods: {
    getColor(status) {
      if (status) return "green";
      else return "red";
    },

    getStatusText(status) {
      if (status) return "Activo";
      else return "Inactivo";
    },

    openCloseDialog() {
      this.clear();
      this.dialog = !this.dialog;
    },

    clear() {
      this.valid = false;
      this.name = "";
      this.quantity = 0;
      this.listState = [];
      this.listWarehouse = [];
      this.remarks = "";
    },

    createProduct() {
      this.snackbar = true;
      this.snackbarText = "Producto agregado";
      this.snackbarColor = "success";

      this.openCloseDialog();
    },

    updateStatus() {
      this.status = !status;
    }
  }
};
</script>
