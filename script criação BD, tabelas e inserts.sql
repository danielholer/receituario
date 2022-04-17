create database receituario;

use receituario;

-- --------------------------------------------------------

--
-- Estrutura da tabela `medicamento`
--

CREATE TABLE IF NOT EXISTS `medicamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `substancia` varchar(50) DEFAULT NULL,
  `dose_min` varchar(20) DEFAULT NULL,
  `dose_max` varchar(20) DEFAULT NULL,
  `dose_usual` varchar(20) DEFAULT NULL,
  `horario` varchar(30) DEFAULT NULL,
  `uso` varchar(10) DEFAULT NULL,
  `controlado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Extraindo dados da tabela `medicamento`
--

INSERT INTO `medicamento` (`id`, `substancia`, `dose_min`, `dose_max`, `dose_usual`, `horario`, `uso`, `controlado`) VALUES
(5, 'paracetamol', NULL, NULL, '5mg', '1 vez ao dia pela manhã', NULL, NULL),
(7, 'anador', NULL, NULL, '3mg', '3 vezes ao dia', NULL, NULL),
(10, 'doril', NULL, NULL, '10mg', '2 vezes ao dia', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `medicamento_receita`
--

CREATE TABLE IF NOT EXISTS `medicamento_receita` (
  `id_receita` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `dosagem` varchar(20) NOT NULL,
  `horario` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `medicamento_receita`
--

INSERT INTO `medicamento_receita` (`id_receita`, `id_medicamento`, `dosagem`, `horario`) VALUES
(16, 10, '10mg', '2 vezes ao dia');

-- --------------------------------------------------------

--
-- Estrutura da tabela `nome_medicamento`
--

CREATE TABLE IF NOT EXISTS `nome_medicamento` (
  `id_medicamento` int(11) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente`
--

CREATE TABLE IF NOT EXISTS `paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `data_nasc` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `paciente`
--

INSERT INTO `paciente` (`id`, `nome`, `cpf`, `data_nasc`, `email`) VALUES
(1, 'Daniel', '12345678910', '01/01/1900', 'teste@teste.com.br'),
(2, 'João', '98765432100', '10/01/1981', 'teste@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `receita`
--

CREATE TABLE IF NOT EXISTS `receita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `data_emissao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Extraindo dados da tabela `receita`
--

INSERT INTO `receita` (`id`, `id_paciente`, `data_emissao`) VALUES
(16, 1, '2015-06-10 21:11:22');