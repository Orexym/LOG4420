import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'test-rapide-form',
    template: `
        <form id="startTest" method='post' action='/question'>
          <input type='submit'  value='Commencer !'/>
        </form>
    `
})

export class TestRapideComponent {

    submitted = false;
    data: String;

    onSubmit(data) {
        this.submitted = true;
        this.data = JSON.stringify(data, null, 2);
        console.log(this.data);
    }


}