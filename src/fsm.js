class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        if ( arguments.length === 0)
        throw new Error();
        else {
            this.initial= 'normal',
            this.states = [
            'normal',
            'busy',
            'hungry',
            'sleeping',
            ];
            this.current = this.initial;
            this.prew = ['normal',];
            this. next = ['normal',];
        }

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;                
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.current !== state){ 
        switch(state){
            case 'hungry' : {
                this.prew.push(this.current);
                this.current = this.states[2];;break;
            }
            case 'sleeping' : {
                this.prew.push(this.current);
                this.current = this.states[3];break;
            }
            case 'normal' : {
                this.prew.push(this.current);
                this.current = this.states[0];break;
            }
            case 'busy' : {
                this.prew.push(this.current);
                this.current = this.states[1];break;
            }
            default : throw new Error("Isn't exist");break;
        }
    }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        switch(event){
            case 'get_hungry' : {
                if((this.current === 'busy') || (this.current === 'sleeping')){
                    this.prew.push(this.current);
                    this.current = this.states[2];break;
            }
            else throw new Error('Is not exist');
            }

            case 'get_tired' : {
                if(this.current === 'busy'){
                    this.prew.push(this.current);
                    this.current = this.states[3];break;
            }
            else throw new Error('Is not exist');
            }
            
            case 'get_up' : {
                if(this.current === 'sleeping'){
                    this.prew.push(this.current);
                    this.current = this.states[0];break;
            }
            else throw new Error('Is not exist');
            }

            case 'eat' : {
                if(this.current === 'hungry'){
                    this.prew.push(this.current);
                    this.current = this.states[0];break;
            }
            else throw new Error('Is not exist');
            }

            case 'study' : {
                if(this.current === 'normal'){
                    this.prew.push(this.current);
                    this.current = this.states[1];break;
                }
                else throw new Error('Is not exist');
            }

            default : throw new Error('Is not exist');break;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current = this.initial;
        this.prew = ['normal',];
        this. next = ['normal',];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(arguments.length === 0){
            return this.states;
        }
        switch(event){
            case 'get_hungry' : return [this.states[1], this.states[3]];break;
            case 'get_tired' : return [this.states[1]];break;
            case 'get_up' : return [this.states[3]];break;
            case 'eat' : return [this.states[2]];break;
            case 'study' : return [this.states[0]];break;
            default : return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prew.length === 1){
            return false;
        }
        else {
            this.next.push(this.current);
            this.current = this.prew.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.next.length === 1){
            return false
        }
        else {
            if(this.prew[this.prew.length - 1] === this.current &&
               this.next[this.next.length - 1] === this.current)
               return false;
               else { 
            this.prew.push(this.current);
            this.current = this.next.pop();
            return true;
               }
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.current = this.initial;
        this.prew = ['normal',];
        this.next = ['normal',];
    }
}

module.exports = FSM;
