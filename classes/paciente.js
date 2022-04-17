function Paciente(prmId, prmNome, prmCPF, prmDtNascimento, prmEmail){
    var id = prmId;
    var nome = prmNome;
    var cpf = prmCPF;
    var dtNascimento = prmDtNascimento;
    var email = prmEmail;
    
    this.setId = function(prmId){ id = prmId; };
    this.getId = function(){ return id; };
    this.setNome = function(prmNome){ nome = prmNome; };
    this.getNome = function(){ return nome; };
    this.setCPF = function(prmCPF){ cpf = prmCPF; };
    this.getCPF = function(){ return cpf; };
    this.setDtNascimento = function(prmDtNascimento){ dtNascimento = prmDtNascimento; };
    this.getDtNascimento = function(){ return dtNascimento; };
    this.setEmail = function(prmEmail){ email = prmEmail; };
    this.getEmail = function(){ return email; };
    
    this.checkForm = function(){
        if(nome === '' || cpf === '' || dtNascimento === ''){
            alert("Erro! Campos obrigatórios não preenchidos.");
            return false;
        }
        return true;
    };
     
    this.salvaPaciente = function(){
        if(this.checkForm()){
            $.post( "wsSetPaciente.php", 
                {
                    id: id,
                    nome: nome, 
                    cpf: cpf,
                    dtNascimento: dtNascimento,
                    email: email
                }
            ).done(function( msg ){
                var res = msg.split("§");
                var id = res[0];
                var strMsg = res[1];
                
                alert( strMsg );
                var receita = new Receita();
                var paciente = new Paciente();
                receita.autoComplete();
                paciente.autoComplete();
                
                //se estiver salvando um paciente novo, atualiza seu id depois que for salvo
                var e = $( "#input-idPaciente-paciente" );
                if(e.val() === ""){
                    e.val(id);
                }
            });
        }
    };

    this.autoComplete = function(){
        var tagsPaciente = [];
        var arrPaciente = [];

        //busca os medicamentos cadastrados no BD
        $.getJSON( "wsGetPacientes.php", function( data ) {
            $.each( data, function( key, val ) {
                tagsPaciente.push( val.nome );
                arrPaciente[val.nome] = new Paciente(val.id, val.nome, val.cpf, val.data_nasc, val.email);
            });
        });

        //função autocompletar ao digitar paciente
        $( "#input-nome-paciente" ).autocomplete({
            source: tagsPaciente,
            close: function() {
                fncEditaPaciente(this);
            }
        });

        //busca os dados do paciente ao digitar
        $( "#input-nome-paciente" ).keyup( function(){
            fncEditaPaciente(this);
        });

        function fncEditaPaciente(e){
            var sel = $(e).val();

            if(tagsPaciente.indexOf(sel) !== -1){
		$( "#input-idPaciente-paciente" ).val(arrPaciente[sel].getId());
                $( "#input-cpf-paciente" ).val(arrPaciente[sel].getCPF());
                $( "#input-dtNascimento-paciente" ).val(arrPaciente[sel].getDtNascimento());
                $( "#input-email-paciente" ).val(arrPaciente[sel].getEmail());
            }
            else{
                $( "#input-idPaciente-paciente" ).val("");
                $( "#input-cpf-paciente" ).val("");
                $( "#input-dtNascimento-paciente" ).val("");
                $( "#input-email-paciente" ).val("");
            }
        }
    }
}