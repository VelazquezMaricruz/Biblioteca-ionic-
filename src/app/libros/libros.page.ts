import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, ToastController } from '@ionic/angular';
import { Libros } from '../interfaces/libro.interface';
import { LibrosService } from '../servicios/libros.service';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {

  @ViewChild(IonRefresher) refresher!: IonRefresher;
  @ViewChild(FormularioLibroComponent) formularioLibros!: FormularioLibroComponent;

  public listaLibros: Libros[] = [];
  public cargandoLibros: boolean = false;
  public modalVisible: boolean = false;

  private libroSeleccionando: Libros | null = null;
  public modoFormulario: 'Registrar'| "Editar" = "Registrar";

  constructor(
    private servicioLibros: LibrosService,
    private servicioToast: ToastController
  ) { }

  ngOnInit() {
    this.cargarLibros();
  }
  public cargarLibros() {
    this.refresher?.complete();
    this.cargandoLibros = true;
    this.servicioLibros.get().subscribe({
      next: (libros) => {
        this.listaLibros = libros;
        this.cargandoLibros = false;
      },
      error: (e) => {
        console.error("Error al consultar libros", e);
        this.cargandoLibros = false;
        this.servicioToast.create({
          header: 'Error al cargar libros',
          message: e.message,
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        }).then(toast => toast.present());
      }
    })
  }

  public nuevo(){
    this.modoFormulario = 'Registrar';
    this.libroSeleccionando = null;
    this.modalVisible = true;
  }

  public editar(libros: Libros){
    this.libroSeleccionando = libros;
    this.modoFormulario = 'Editar';
    this.modalVisible = true;
  
  }

  public cargarDatosEditar(){
    if(this.modoFormulario === 'Editar'){
      this.formularioLibros.modo = this.modoFormulario;
       this.formularioLibros.form.controls.idCtrl.setValue(this.libroSeleccionando .id);
      this.formularioLibros.form.controls.tituloCtrl.setValue(this.libroSeleccionando .titulo);
      this.formularioLibros.form.controls.idautorCtrl.setValue(this.libroSeleccionando .idautor);
      this.formularioLibros.form.controls.paginasCtrl.setValue(this.libroSeleccionando .paginas);
    }
  }
}
