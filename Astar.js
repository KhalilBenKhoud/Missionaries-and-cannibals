var StartState = [[1,3,3], [2,0,0],"left"]
var endState = [[1,0,0], [2,3,3],"right"]
var starting  = new Node(StartState,null,[],0)

printWinningPath() // fonction à exécuter

// j'ai copié cette implémentation de PriorityQueue en javascript de FreeCodeCamp
function PriorityQueue() {
    var collection = [];
    this.printCollection = function() {
      (console.log(collection));
    };
    this.enqueue = function(element){
        if (this.isEmpty()){ 
            collection.push(element);
        } else {
            var added = false;
            for (var i=0; i<collection.length; i++){
                 if (element[1] < collection[i][1]){ //checking priorities
                    collection.splice(i,0,element);
                    added = true;
                    break;
                }
            }
            if (!added){
                collection.push(element);
            }
        }
    };
    this.dequeue = function() {
        var value = collection.shift();
        return value[0];
    };
    this.front = function() {
        return collection[0];
    };
    this.size = function() {
        return collection.length; 
    };
    this.isEmpty = function() {
        return (collection.length === 0); 
    };
    this.elementAt = function(index) {
        if(index < collection.length && index > -1 )
       { return  collection[index] }
        else { return false }
    };
    //j'ai ajouté celle-ci
    this.containsAbetterState = function(element)
    {   if(collection == []) { return false }
        else {
        for (let i=0; i < collection.length; i++)
        {
            if( JSON.stringify(collection[i][0].state) == JSON.stringify(element.state)
             && collection[i][1] < calculateFx(element))
         {
             return true
         }
        }
        return false
        }
    };

    
}

function Node(state, parent, children, depth) { // j'ai trouvé ce constructeur dans un autre projet sur Github
    this.state = state;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
    
}

function calculateFx(node)  // Fx = G + H
{   // the more we perform a move (boat movment) the more the depth of our tree increases
    // and thus the value of g
    var G = node.depth
    // h = 6 - M(R=2) - C(R=2) 
    // the more the number of missionaries and cannibals on the second shore 
    // is decreased the more we are closer to the goal state
    // thus we substract their count from the the maximal value which is 6
    var H = 6 - (node.state[1][2] + node.state[1][1])

    return H + G
}

function createSuccesorNodes(node)
{    
     if(node.depth % 2 == 0) // aller
     {   
         for(let c = 0; c <= 2 ; c++)
       {  for(let m = 0; m <= 2 ; m++)
         {   // boat minimal and maximal capacity
             if( m + c < 1 || m + c > 2 ) { continue  } 
             //the number of passengers of each type has to be higher or equal than
             //those already in the first shore
             if(c > node.state[0][1] || m > node.state[0][2]) { continue }
             // avoid eatings
             if(!(node.state[0][2] - m == 0 || node.state[0][1] - c <= node.state[0][2] - m))
             { continue }
             if(!(node.state[1][2] + m == 0 || node.state[1][1] + c <=  node.state[1][2] + m))
             { continue }
             var succesorState = [
                [1,node.state[0][1] - c,node.state[0][2] - m ],
                [2,node.state[1][1] + c,node.state[1][2] + m ],
                "right"
             ]
             var succesorNode = new Node(succesorState,node,[],node.depth + 1)          
             node.children.push(succesorNode)
         }
       }
     }
     else { //retour
       
        for(let c = 0; c <= 2 ; c++)
      { for(let m = 0; m <= 2 ; m++) 
     { // boat minimal and maximal capacity
     if( m + c < 1 || m + c > 2 ) { continue  } 
     //the number of passengers of each type has to be higher or equal than
     //those already in the first shore
     if(c > node.state[1][1] || m > node.state[1][2]) { continue }
     // avoid eatings
     if(!(node.state[0][2] + m == 0 || node.state[0][1] + c <= node.state[0][2] + m))
     { continue }
     if(!(node.state[1][2] - m == 0 || node.state[1][1] - c <=  node.state[1][2] - m))
     { continue }
     var succesorState = [
        [1,node.state[0][1] + c,node.state[0][2] + m ],
        [2,node.state[1][1] - c,node.state[1][2] - m ],
        "left"
     ]
     var succesorNode = new Node(succesorState,node,[],node.depth + 1)
     succesorNode.parent = node         
     node.children.push(succesorNode)
     }
    }
    }
}


function AstarSearch()
{  
    var open = new PriorityQueue()
    var closed = new PriorityQueue()
    open.enqueue([starting,calculateFx(starting)])
     while(!open.isEmpty())
     {
         var q = open.front()[0]
         open.dequeue()
         
         
         createSuccesorNodes(q) 
                                               
         for(let i=0 ; i < q.children.length ; i++)
         {
            if(JSON.stringify(q.children[i].state) == JSON.stringify(endState))
            { return q.children[i] }
            
            if(open.containsAbetterState(q.children[i])) { continue }
            if(closed.containsAbetterState(q.children[i])) { continue }
            open.enqueue([q.children[i],calculateFx(q.children[i])])
               
         }
        

         closed.enqueue([q,calculateFx(q)])           
     }
    
    return null  
}



function WinningPath()
{   
    var winningNode = AstarSearch()
    var x = winningNode
    var path = [x.state]
    while(x.parent)
    {   
        path.push(x.parent.state)
        x = x.parent
    }
    path = path.reverse()
    for(let i = 0; i < path.length ; i++)
    {
        path[i] = [path[i]]
    }
    return path
    
}


function printWinningPath()
{   var path = WinningPath()
    for(let i = 0; i < path.length ; i++)
    {
        console.log(JSON.stringify(path[i]))
    }
}

