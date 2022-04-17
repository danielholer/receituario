function Medicamento(prmId, prmSubstancia, prmDosagem, prmDoseMin, prmDoseMax, prmHorario, prmUso, prmControlado){
    var id = prmId;
    var substancia = prmSubstancia;
    var dosagem = prmDosagem;
    var doseMin = prmDoseMin;
    var doseMax = prmDoseMax;
    var horario = prmHorario;
    var uso = prmUso;
    var controlado = prmControlado;
    
    this.setId = function(prmId){ id = prmId; };
    this.getId = function(){ return id; };
    this.setSubstancia = function(prmSubstancia){ substancia = prmSubstancia; };
    this.getSubstancia = function(){ return substancia; };
    this.setDosagem = function(prmDosagem){ dosagem = prmDosagem; };
    this.getDosagem = function(){ return dosagem; };
    this.setDoseMin = function(prmDoseMin){ doseMin = prmDoseMin; };
    this.getDoseMin = function(){ return doseMin; };
    this.setDoseMax = function(prmDoseMax){ doseMax = prmDoseMax; };
    this.getDoseMax = function(){ return doseMax; };
    this.setHorario = function(prmHorario){ horario = prmHorario; };
    this.getHorario = function(){ return horario; };
    this.setuso = function(prmUso){ uso = prmUso; };
    this.getuso = function(){ return uso; };
    this.setControlado = function(prmControlado){ controlado = prmControlado; };
    this.getControlado = function(){ return controlado; };
    
    this.checkForm = function(){
        if(substancia === '' || dosagem === '' || horario === ''){
            alert("Erro! Campos obrigatórios não preenchidos.");
            return false;
        }
        return true;
    };
     
    this.salvaMedicamento = function(){
        if(this.checkForm()){
            $.post( "wsSetMedicamento.php", 
                {
                    id: id,
                    substancia: substancia, 
                    dosagem: dosagem,
                    horario: horario,
                }
            ).done(function( msg ){
                var res = msg.split("§");
                var id = res[0];
                var strMsg = res[1];
                
                alert( strMsg );
                var receita = new Receita();
                var medicamento = new Medicamento();
                receita.autoComplete();
                medicamento.autoComplete();
                
                //se estiver salvando um medicamento novo, atualiza seu id depois que for salvo
                var e = $( "#input-idMedicamento-medicamento" );
                if(e.val() === ""){
                    e.val(id);
                }
            });
        }
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

        //função autocompletar ao digitar medicamento
        $( "#input-substancia-medicamento" ).autocomplete({
            source: tagsMedicamento,
            close: function() {
                fncEditaMedicamento(this);
            }
        });

        //busca os dados do medicamento ao digitar
        $( "#input-substancia-medicamento" ).keyup( function(){
            fncEditaMedicamento(this);
        });

        function fncEditaMedicamento(e){
            var sel = $(e).val();

            if(tagsMedicamento.indexOf(sel) !== -1){
                $( "#input-idMedicamento-medicamento" ).val(arrMedicamento[sel].getId());
                $( "#input-dosagem-medicamento" ).val(arrMedicamento[sel].getDosagem());
                $( "#input-doseMin-medicamento" ).val(arrMedicamento[sel].getDoseMin());
                $( "#input-doseMax-medicamento" ).val(arrMedicamento[sel].getDoseMax());
                $( "#input-horario-medicamento" ).val(arrMedicamento[sel].getHorario());
                $( "#input-uso-medicamento" ).val(arrMedicamento[sel].getUso());
                $( "#input-controlado-medicamento" ).val(arrMedicamento[sel].getControlado());
            }
            else{
                $( "#input-idMedicamento-medicamento" ).val("");
                $( "#input-dosagem-medicamento" ).val("");
                $( "#input-horario-medicamento" ).val("");
            }
        }
    }
}