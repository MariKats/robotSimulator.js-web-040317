'use strict';

function Robot() {
  this.coordinates = [0, 0]
  this.bearing = ""

}

Robot.prototype.at = function(x,y) {
  this.coordinates = [x,y]
}

 Robot.prototype.orient = function(currentDirection) {
   var directions = [ 'east', 'west', 'north', 'south' ]
     if (directions.includes(currentDirection)) {
       this.bearing = currentDirection
     }
     else {
       throw new Error("Invalid Robot Bearing")
     }
   }

   Robot.prototype.turnRight = function() {
     switch (this.bearing) {
       case 'north': this.bearing = 'east'; break;
       case 'east': this.bearing = 'south'; break;
       case 'south': this.bearing = 'west'; break;
       case 'west': this.bearing = 'north'; break;
     }
   }

   Robot.prototype.turnLeft = function() {
     switch (this.bearing) {
       case 'north': this.bearing = 'west'; break;
       case 'west': this.bearing = 'south'; break;
       case 'south': this.bearing = 'east'; break;
       case 'east': this.bearing = 'north'; break;
     }
   }

   Robot.prototype.advance = function() {
     switch (this.bearing) {
       case 'north': this.coordinates[1]+=1; break;
       case 'south': this.coordinates[1]-=1; break;
       case 'east': this.coordinates[0]+=1; break;
       case 'west': this.coordinates[0]-=1; break;
     }
   }

   Robot.prototype.instructions = function(instruction) {
     var ins = instruction.split("");
     var arr = []
     for (let i in ins) {
       switch (ins[i]) {
         case 'L': arr.push('turnLeft'); break;
         case 'R': arr.push('turnRight'); break;
         case 'A': arr.push('advance'); break;
       }
     }
     return arr
   }

   Robot.prototype.place = function(hash) {
     this.coordinates[0] = hash.x
     this.coordinates[1] = hash.y
     this.bearing = hash.direction
   }

   Robot.prototype.evaluate = function(instruction) {
      var array = this.instructions(instruction)
      for (let i in array) {
        this[array[i]]()
      }
   }
