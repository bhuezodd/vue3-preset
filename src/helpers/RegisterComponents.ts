import { App } from 'vue';
import { upperFirst, camelCase } from 'lodash/fp';

/* eslint no-underscore-dangle: ["error", { "allow": ["_instance"] }] */
export default class RegisterComponents {
  protected vue: App;

  public constructor(vue: App) {
    this.vue = vue;
  }

  public setComponents(): void {
    const arr = require.context(
      '@/components',
      false,
      /[\w-]+\.vue$/,
    );
    this.registerComponent(arr);
  }

  public setLayouts(): void {
    const arr = require.context(
      '@/layouts',
      false,
      /[\w-]+\.vue$/,
    );

    this.registerComponent(arr);
  }

  public registerComponent(arr: __WebpackModuleApi.RequireContext): void {
    arr.keys().forEach((fileName: string) => {
      // Obtener la configuración de los componentes
      const componentConfig = arr(fileName);

      // Obtener el nombre PascalCase del componente
      const componentName = upperFirst(
        camelCase(
          // Quitar el `./`en el comienzo y la extensión del nombre del archivo
          fileName.replace(/^\.\/(.*)\.\w+$/, '$1'),
        ),
      );

      // Registrar el componente a nivel global
      this.vue.component(
        componentName,
        // Busca las opciones de componentes en `.default`, que
        // existen si el componente fue exportado con `export default`,
        // de lo contrario volver a la raíz del módulo.
        componentConfig.default || componentConfig,
      );
    });
  }
}
