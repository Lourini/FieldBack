import { Component } from '@angular/core';
import { CodeStandardService } from '../../services/code-standard.service';
import {CodeStandard} from '../../models/codestandard.model';

@Component({
  selector: 'app-code-standard',
  templateUrl: './code-standard.component.html',
  styleUrls: ['./code-standard.component.scss']
})
export class CodeStandardComponent {

  public CodesStandard: CodeStandard[] = [];
  public titlemodel = '';
  public buttonType!: boolean;
  public CurrentCodeStandard: CodeStandard = { code: '', description: '', type: '' };
  constructor(private codeStandardService: CodeStandardService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.codeStandardService.getAllCodeStandards().subscribe(resp => {
      this.CodesStandard = resp;
    }, error => {
      console.log(error);
    });
  }

  onOpenModalToAdd() {
    this.titlemodel = 'Ajouter';
    this.buttonType = true;
    this.CurrentCodeStandard = { code: '', description: '', type: '' };
  }
  onOpenMdalToUpdate(codestandard: any) {
    this.titlemodel = 'Modifier';
    this.buttonType = false;
    this.CurrentCodeStandard = codestandard;
  }
  onAdd() {
    this.codeStandardService.createCodeStandard(this.CurrentCodeStandard).subscribe((res: any) => {
      this.loadData();
      this.CurrentCodeStandard = { code: '', description: '', type: '' };
    },
      (error) => {
        console.error('Error :', error);
      });
  }
  onUpdate() {
    if (this.CurrentCodeStandard.id)
      this.codeStandardService.updateCodeStandard(this.CurrentCodeStandard.id, this.CurrentCodeStandard).subscribe((res: any) => {
        this.loadData();
        this.CurrentCodeStandard = { code: '', description: '', type: '' };
      },
        (error) => {
          console.error('Error :', error);
        });
  }
  onDelete(id: string | undefined) {
    if (id)
      this.codeStandardService.deleteCodeStandard(id).subscribe((res: any) => {
        this.loadData();
      },
        (error) => {
          console.error('Error :', error);
        });
  }

}
