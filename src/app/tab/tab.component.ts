import { Component, OnInit, Input } from '@angular/core';
import { Tab } from "./tab.interface";
import { TabsComponent } from 'app/tabs/tabs.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})

// Para hacer uso de la interfaz Tab en vez del componente TabComponent, debo implementar aquí la interfaz
export class TabComponent implements OnInit, Tab {

  @Input() title:string;
  public isActive:boolean = false;

  // Para acceder a las propiedades y métodos del componente padre, hago uso de la inyección de dependencias
  constructor(private tabs: TabsComponent) { }

  ngOnInit() {
    // cada tab se auto-añade al listado de tabs haciendo uso del método addTab() que pertenece al componente padre
    this.tabs.addTab(this);
  }

}
