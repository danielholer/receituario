function Receita(){
    var id;
    var dtEmissao;
    var paciente = new Paciente();
    var arrMedicamentos = [];
    
    this.setId = function(prmId){ id = prmId; };
    this.getId = function(){ return id; };
    this.setPaciente = function(prmPaciente){ paciente = prmPaciente; };
    this.getPaciente = function(){ return paciente; };
    this.setDtEmissao = function(prmDtEmissao){ dtEmissao = prmDtEmissao; };
    this.getDtEmissao = function(){ return dtEmissao; };
    
    this.append = function(medicamento){
        $("#div-input-medicamentos").append(
            "<div class='panel panel-default' style='width:25%;'>" +
                "<input type='hidden' value='" + medicamento.getId() + "'>" +
                "<input type='hidden' value='" + medicamento.getSubstancia() + "'>" +
                "<div class='panel-heading'>" +
                    "<h2 class='panel-title'>" + medicamento.getSubstancia() + "</h2><h2 class='panel-title link-right' onClick='$(this).parent().parent().remove();'>" +
                        "<img src='img/Remove.png' alt='Remover' height='20' width='20'>" +
                    "</h2>" +
                "</div>" +
                "<div class='panel-body'>" +
                    "<div class='input-group'>" +
                        "<span class='input-group-addon'>Dosagem</span>" +
                        "<input type='text' class='form-control' value='" + medicamento.getDosagem() + "'>" +
                    "</div><br/>" +
                    "<div class='input-group'>" +
                        "<span class='input-group-addon'>Hor&aacuterio</span>" +
                        "<input type='text' class='form-control' value='" + medicamento.getHorario() + "'>" +
                    "</div><br/>" +
                "</div>" +
            "</div>"
        );
    };

    this.addMedicamento = function(medicamento){
        arrMedicamentos.push(medicamento);
    };
    
    this.checkForm = function(){
        if(arrMedicamentos.length < 1){
            alert("Erro! A receita não tem nenhum medicamento.");
            return false;
        }
        else if(!paciente){
            alert("Erro! Não foi selecionado nenhum paciente.");
            return false;            
        }
        return true;
    };
    
    this.checkRepetido = function(medicamento){
        var i = 0;
        var retorno = true;
        $("#div-input-medicamentos *").filter(':input').each(function(){
            if(i%4 === 0){
                var value = $(this).val();
                var id = medicamento.getId();
                if(value === id && retorno){
                    alert("Erro! Este medicamento já foi adicionado à receita.");
                    $( "#input-idMedicamento" ).val("");
                    $( "#input-substancia" ).val("");
                    $( "#input-dosagem" ).val("").attr("disabled","disabled");
                    $( "#input-horario" ).val("").attr("disabled","disabled");
                    $( "#panel-receita-medicamento input:text" ).first().focus();
                    retorno = false;
                }
            }
            i++;
        });
        return retorno;
    };
    
    this.salvaReceita = function(){
        if(this.checkForm()){
            $.post( "wsSetReceita.php", 
                {   
                    idPaciente: paciente.getId(),
                    medicamentos: this.getMedicamentos()
                }
            ).done(function( msg ){
                //alert( msg );
                //$( "#btn-cancelar-receita" ).click();
            });
        }
        else{
        }
        
    };

    this.imprimeReceita = function(){
        if(this.checkForm()){
            this.geraPDF();
        }
        else{
        }
        
    };
     
    this.getMedicamentos = function(){
        var str = "";
        arrMedicamentos.forEach(function(medicamento) {
            str += medicamento.getId() + "|";
            str += medicamento.getDosagem() + "|";
            str += medicamento.getHorario() + "§";
        });
        return str.substring(0,str.length - 1);
    };
     
    this.autoComplete = function(){
        var tagsMedicamento = [];
        var arrMedicamento = [];

        //busca os medicamentos cadastrados no BD
        $.getJSON( "wsGetMedicamentos.php", function( data ) {
            $.each( data, function( key, val ) {
                tagsMedicamento.push( val.substancia );
                arrMedicamento[val.substancia] = new Medicamento(val.id, val.substancia, val.dose_usual, val.horario);
            });
        });

        //auto completar medicamento buscando pelo nome
        $( "#input-substancia" ).autocomplete({
            source: tagsMedicamento,
            close: function() {
                fncDetalhesMedicamento(this);
            }
        });

        //preenche os detalhes do medicamento a cada tecla digitada
        $( "#input-substancia" ).keyup( function(){
            fncDetalhesMedicamento(this);
        });

        //função que mostra os detalhes do medicamento
        function fncDetalhesMedicamento(e){
            var sel = $(e).val();

            if(tagsMedicamento.indexOf(sel) !== -1){
                $( "#input-idMedicamento" ).val(arrMedicamento[sel].getId());
                $( "#input-dosagem" ).val(arrMedicamento[sel].getDosagem()).removeAttr("disabled");
                $( "#input-horario" ).val(arrMedicamento[sel].getHorario()).removeAttr("disabled");
            }
            else{
                $( "#input-idMedicamento" ).val("");
                $( "#input-dosagem" ).val("").attr("disabled","disabled");
                $( "#input-horario" ).val("").attr("disabled","disabled");
            }
        }
    };
    
    this.geraPDF = function(){
        var arrStrMedicamentos = [];
        arrMedicamentos.forEach(function(medicamento) {
            arrStrMedicamentos.push(medicamento.getSubstancia() + " " + medicamento.getDosagem());
            //arrStrMedicamentos.push(medicamento.getDosagem());
            arrStrMedicamentos.push(medicamento.getHorario());
            arrStrMedicamentos.push(" ");
        });

        var docDefinition = { content: [
            {text: 'Cabeçalho da Receita (logomarca da clínica)', fontSize:30, alignment: 'center'},
            {text: ' ', fontSize:30, alignment: 'center'},
            arrStrMedicamentos
        ]};

        pdfMake.createPdf(docDefinition).open();
    };
}