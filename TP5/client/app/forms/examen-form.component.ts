import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'examen-form',
    template: `
        <form (ngSubmit)="onSubmit(examenForm.value)" #examenForm="ngForm" id="startExamen" method="post" action="/question">
          <p>
            <label for="domaine">Domaine :</label><span class="styled-select">
              <select id="domaine" name="domain">
                <option value="html">HTML5</option>
                <option value="css">CSS3</option>
                <option value="js">JavaScript</option>
              </select></span>
          </p>
          <p>
            <label for="nbquestions">Nombre de questions :</label>
            <input id="nbquestions" type="number" name="totalQuestions" value="3" step="1" min="1" max="10"/>
          </p>
          <input type="submit" value="Commencer !"/>
        </form>
    `
})

export class Examen {

    submitted = false;
    data: String;
    domain: String;

    onSubmit(data) {
        this.submitted = true;
        this.data = JSON.stringify(data, null, 2);
        console.log(this.data);
    }


}