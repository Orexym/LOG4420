import {Pipe} from "@angular/core";

@Pipe({
    name: 'reverser'
})
export class ReversePipe {
    transform(value) {
        if(!value) return value;
        return value.slice().reverse();
    }
}