
    

       
        //quando carregar a janela será apresentado  o jogo e assim que o usuário pressionar alguma tecla de para cima/para baixo,para direita  ou para esquerda será iniciado o jogo;
       

        window.onload = function(){
            
            //stage é o quadrado que vai aparecer o jogo;
            //contexto é o local onde ocorre a coloração do local
            var stage = document.getElementById('stage');
            var contexto = stage.getContext("2d");

            // captura a pontuação
            var pontos = document.getElementById('pontos');
            var mudaPontuacao = 0; 
               
        
            
             //toda vez que uma tecla for pressionada será executada a função keypush;
            document.addEventListener("keydown", keyPush);
            
            
            // o setInterval defina o intervalo pra função ser chamada várias vezes naquele intervalo(que aqui foi definido como 80segundos);
            setInterval(jogo, 80);
 
            // quantas casas a cobra vai andar quando chamarmos a função jogo//
            const velocidade = 1;
 
            var velx = 0,
                vely = 0, // velocidade de x;
                pontoX =10, //ponto em que começa
                pontoY= 15,
                tamQuad = 30, //tamanho do quadrado
                quantPeca = 20, // quantidade de peças
                mx= 15, //tamanho da maça em x;
                my=15; //tamanho da maça em y;
                

               
            //rastro da cobra
            var rastro = [];
            var cauda = 5;
 
            function jogo(){
                
                pontoX += velx;
                pontoY += vely;
                if (pontoX <0) {
                    pontoX = quantPeca-1;
                }
                if (pontoX > quantPeca-1) {
                    pontoX = 0;
                }
                if (pontoY < 0) {
                    pontoY = quantPeca-1;
                }
                if (pontoY > quantPeca-1) {
                    pontoY = 0;
                }
 
                     
                //pintando o local onde vai estar ocorendo o jogo//
                contexto.fillStyle = "black";
                contexto.fillRect(0,0, stage.width, stage.height);
 
                 //coloração da maçazinha
                contexto.fillStyle = "red";
                contexto.fillRect(mx*tamQuad, my*tamQuad, tamQuad,tamQuad);
 
                
                 //coloração da cobra
                contexto.fillStyle = "green";
                for (var i = 0; i < rastro.length; i++) {
                    contexto.fillRect(rastro[i].x*tamQuad, rastro[i].y*tamQuad, tamQuad-1,tamQuad-1);
                   
                    //verifica se a cabeça da cobra bateu na cauda , se bateu dá GAME OVER
                    if (rastro[i].x == pontoX && rastro[i].y == pontoY){
                        velx = vely=0;
                        cauda =5;
                         
                    }
                }
                
                 //já que ela não bateu na cauda, então vamos fazer ela se movimentar
                rastro.push({x:pontoX,y:pontoY })
                
                  // se o rastro for maior do que a cauda, retira-se um elemento da cauda;
                while (rastro.length > cauda) {
                    rastro.shift();
                }
               
                
                 //para aumentar  a cauda;
                if (mx==pontoX && my==pontoY){
                    cauda++;
                   
                    mx = Math.floor(Math.random()*quantPeca);
                    my = Math.floor(Math.random()*quantPeca);
                    pontos.innerHTML = ++mudaPontuacao;
                }

               
            
            }
            
           

             
            window.addEventListener("keydown", function(event) {
                // verifica as teclas de seta
                if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                    event.preventDefault();
                }
            });
                

           var  lastKeyPressed = ""

           
            //movimentação da cobra;
            function keyPush(event){
                //  verifica qual foi a tecla pressionada;
                switch (event.keyCode) {
                    case 37: // se foi a tecla da esquerda
                    // Verifica qual foi a ultima tecla pressiona, pois  sem esse trecho de código se a cobrinha estiver indo na direção esquerda e for pressionada a tecla direita o jogo entende que a cobra encostou na cauda(o mesmo acontece em vice  e versa e para cima e para baixo)
                        if(lastKeyPressed != "right"){ 
                            velx = -velocidade;
                             vely = 0;
                             lastKeyPressed = "left";
                        }
                        if(cauda == 5){ //faz com que a pontuação zere assim  que for pressionada uma das teclas
                            mudaPontuacao = 0 ;   
                            pontos.innerHTML = mudaPontuacao; 
                        } 
                        break;
                    case 38: // se foi a tecla para cima
                        if(lastKeyPressed != "down"){
                            velx = 0;
                            vely = -velocidade;
                            lastKeyPressed = "up"
                        }
                       
                        if(cauda == 5){ 
                            mudaPontuacao = 0 ;   
                            pontos.innerHTML = mudaPontuacao; 
                        }
                        break;
                    case 39: // se foi a tecla da direita
                        if(lastKeyPressed != "left"){
                            velx = velocidade;
                            vely = 0;
                            lastKeyPressed = "right";
                        }
                        if(cauda == 5){ 
                            mudaPontuacao = 0 ;   
                            pontos.innerHTML = mudaPontuacao; 
                        }
                        break;
                    case 40: // se foi a tecla para baixo
                        if(lastKeyPressed != "up"){
                            velx = 0;
                            vely = velocidade;
                            lastKeyPressed = "down";
                        }
                       
                        if(cauda == 5){ 
                            mudaPontuacao = 0 ;   
                            pontos.innerHTML = mudaPontuacao; 
                        }
                        break;         
                    default: 
                    break;
                }
                
            }
          
        }
