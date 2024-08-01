USE `TruckTracking`;

CREATE TABLE `Adblue`(
	`IdAdBlue` int NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumBOn` varchar(10) NULL,
	`Date` datetime NULL,
	`IdStation` int NULL,
	`Commentaire` varchar(100) NULL,
	`IdModePaiement` int NULL,
	`Qte` decimal(18, 2) NULL,
	`PuTTC` decimal(18, 2) NULL,
	`MontanTTTC` decimal(18, 2) NULL
);


CREATE TABLE `Article`(
	`IdArticle` int AUTO_INCREMENT NOT NULL,
	`DesignationArticle` varchar(50) NULL,
	`SuiviStock` int NULL,
	`CodeArticle` varchar(10) NULL,
	`StockMin` int NULL,
	`StockMax` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_Article` PRIMARY KEY 
	(
		`IdArticle` ASC
	)
);

CREATE TABLE `AutoRoute`(
	`IdAutoRoute` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumBON` varchar(50) NULL,
	`Date` datetime NULL,
	`IdPeageDepart` int NULL,
	`IdPeageArrivee` int NULL,
	`IdModePaiement` int NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdAttachement` int NULL,
	`CheminAttachement` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdTypeFlotte` int NULL,
	`IdFlotte` int NULL,
 CONSTRAINT `PK_AutoRoute` PRIMARY KEY 
	(
		`IdAutoRoute` ASC
	)
);

CREATE TABLE `Carburant`(
	`IdCarburant` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumBOn` varchar(50) NULL,
	`Date` datetime NULL,
	`IdStation` int NULL,
	`IdCiterne` int NULL,
	`Commentaire` varchar(50) NULL,
	`IdModePaiement` int NULL,
	`Qte` decimal(18, 2) NULL,
	`PuTTC` decimal(18, 2) NULL,
	`MontanTTTC` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdTypeFlotte` int NULL,
	`IdFlotte` int NULL,
	`IdTypeCarburant` int NULL,
 CONSTRAINT `PK_Carburant` PRIMARY KEY 
	(
		`IdCarburant` ASC
	)
);


CREATE TABLE `Carte`(
	`IdCarte` int AUTO_INCREMENT NOT NULL,
	`NumCarte` varchar(20) NULL,
	`NomCarte` varchar(50) NULL,
	`Datedebit` datetime NULL,
	`DateFin` datetime NULL,
	`PlafonCarburant` decimal(18, 2) NULL,
	`PlafonService` decimal(18, 2) NULL,
	`TypeCarte` varchar(50) NULL,
	`TypeAffectation` varchar(50) NULL,
	`Actif` int NULL,
	`IdFlotte` int NULL,
	`IdChauffeur` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`TypeFlotte` int NULL,
	`PIN` varchar(20) NULL,
	`DateAffectation` datetime NULL,
	`IdVehicule` int NULL,
 CONSTRAINT `PK_Carte` PRIMARY KEY 
	(
		`IdCarte` ASC
	)
);

CREATE TABLE `ChargeDossier`(
	`IdChargeDossier` int AUTO_INCREMENT NOT NULL,
	`IdDossier` int NULL,
	`IdCharge` int NULL,
	`PuTTC` decimal(18, 2) NULL,
	`Qte` decimal(18, 2) NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdFournisseur` int NULL,
	`IdDevise` int NULL,
	`CoursDevise` decimal(18, 2) NULL,
	`Commentaire` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`Reference` varchar(50) NULL,
	`DateCharge` datetime NULL,
 CONSTRAINT `PK_ChargeDossier` PRIMARY KEY 
	(
		`IdChargeDossier` ASC
	)
);


CREATE TABLE `Chauffeur`(
	`IdChauffeur` int AUTO_INCREMENT NOT NULL,
	`NomChauffeur` varchar(50) NULL,
	`Adresse` varchar(50) NULL,
	`Ville` varchar(50) NULL,
	`Tel1` varchar(50) NULL,
	`Tel2` varchar(50) NULL,
	`Email` varchar(50) NULL,
	`CIN` varchar(50) NULL,
	`IdPays` int NULL,
	`CodeChauffeur` nvarchar(10) NULL,
	`IdFlotte` int NULL,
	`IdVehicule` int NULL,
	`NumPermis` varchar(50) NULL,
	`Type` varchar(50) NULL,
	`DateCate;rieA` datetime NULL,
	`DateRestriction` datetime NULL,
	`DateCate;rieB` datetime NULL,
	`DateCate;rieC` datetime NULL,
	`DateCate;rieD` datetime NULL,
	`DateCate;rieEB` datetime NULL,
	`DateCate;rieED` datetime NULL,
	`DateLivraison` datetime NULL,
	`DateFinValidite` datetime NULL,
	`NombrePoint` nvarchar(10) NULL,
	`DateCate;rieEC` datetime NULL,
	`TypeA` int NULL,
	`TypeB` int NULL,
	`TypeC` int NULL,
	`TypeD` int NULL,
	`TypeEB` int NULL,
	`TypeEC` int NULL,
	`TypeED` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdDepot` int NULL,
	`Experience` varchar(50)
 CONSTRAINT `PK_Chauffeur` PRIMARY KEY 
	(
		`IdChauffeur` ASC
	)
);


CREATE TABLE `Citerne`(
	`IdCiterne` int AUTO_INCREMENT NOT NULL,
	`NumCiterne` varchar(50) NULL,
	`NomCiterne` varchar(50) NULL,
	`PlafonCarburant` decimal(18, 2) NULL,
	`StockMin` decimal(18, 2) NULL,
	`TypeCarburant` int NULL,
	`Actif` int NULL,
	`IdFlotte` int NULL,
	`QteTOtalRechargee` decimal(18, 2) NULL,
	`QteTotalConsomme` decimal(18, 2) NULL,
	`QteReel` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_Citerne` PRIMARY KEY 
	(
		`IdCiterne` ASC
	)
);

CREATE TABLE `ContratAchat`(
	`IdContrat` int AUTO_INCREMENT NOT NULL,
	`IdTypeContrat` int NULL,
	`CodeContrat` varchar(50) NULL,
	`DateContrat` datetime NULL,
	`IdVehicule` int NULL,
	`IdTiers` int NULL,
	`Garantie` decimal(18, 2) NULL,
	`Commentaire` varchar(50) NULL,
	`MontantHTAchat` decimal(18, 2) NULL,
	`MontantTTCAchat` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_ContratAchat` PRIMARY KEY 
	(
		`IdContrat` ASC
	)
);

CREATE TABLE `ContratLeasing`(
	`IdContratLeasing` int AUTO_INCREMENT NOT NULL,
	`NumContrat` varchar(50) NULL,
	`IdCessionnaire` int NULL,
	`DateDebitContrat` datetime NULL,
	`DateFinContrat` datetime NULL,
	`IdLeasing` int NULL,
	`DateReception` datetime NULL,
	`DatePremierPrelivement` datetime NULL,
	`Duree` decimal(18, 2) NULL,
	`Commentaire` varchar(50) NULL,
	`MontantHT` decimal(18, 2) NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`MontantPrelevementHT` decimal(18, 2) NULL,
	`MontantPrelevemntTTC` decimal(18, 2) NULL,
	`MontantFinancierHT` decimal(18, 2) NULL,
	`MontantFinancierTTC` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdVehicule` int NULL,
 CONSTRAINT `PK_ContratLeasing` PRIMARY KEY 
	(
		`IdContratLeasing` ASC
	)
);

CREATE TABLE `ContratLocation`(
	`IdContratLocation` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdTiers` int NULL,
	`NumContrat` varchar(50) NULL,
	`DateContrat` datetime NULL,
	`Commentaire` varchar(50) NULL,
	`DateDebitContrat` datetime NULL,
	`DateFinCOntrat` datetime NULL,
	`MontantFranchise` decimal(18, 2) NULL,
	`Duree` decimal(18, 2) NULL,
	`MontantHTLoyer` decimal(18, 2) NULL,
	`MontantTTCLoyer` decimal(18, 2) NULL,
	`PrixKilometrageSupplimentaire` decimal(18, 2) NULL,
	`KilometrageDebit` decimal(18, 2) NULL,
	`KilometrageFin` decimal(18, 2) NULL,
	`KilometrageParcouru` decimal(18, 2) NULL,
	`PlafonKilometrage` decimal(18, 2) NULL,
	`PlafonPneumatique` decimal(18, 2) NULL,
	`IdutilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdutilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_ContratLocation` PRIMARY KEY 
	(
		`IdContratLocation` ASC
	)
);

CREATE TABLE `Depense`(
	`IdDepence` int NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumBON` varchar(50) NULL,
	`Date` datetime NULL,
	`IdModePaiement` int NULL,
	`TypeDepence` int NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdAttachement` int NULL,
	`Attachement` varchar(100) NULL
);

CREATE TABLE `Depot`(
	`IdDepot` int AUTO_INCREMENT NOT NULL,
	`IntituleDepot` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdChauffeur` int NULL,
 CONSTRAINT `PK_Depot` PRIMARY KEY 
	(
		`IdDepot` ASC
	)
);

CREATE TABLE `DetailDossiereTrajet`(
	`IdDetailDossierTrajet` int AUTO_INCREMENT NOT NULL,
	`IdEnteteDossier` int NULL,
	`IdLieuChargement` int NULL,
	`DateChargement` datetime NULL,
	`IdLieuDechargement` int NULL,
	`DateDechargement` datetime NULL,
	`IdTypeVehicule` int NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumCMR` varchar(50) NULL,
	`IdFlotte` int NULL,
	`IdSousTraitant` int NULL,
	`IdDetailDossierTracking` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`TypeFlotte` int NULL,
	`IdDetailTracking` int NULL,
	`STOP` int NULL,
 CONSTRAINT `PK_DetailDossiereTrajet` PRIMARY KEY 
	(
		`IdDetailDossierTrajet` ASC
	)
);

CREATE TABLE `DetailDossierMarchandise`(
	`IdDetailDossierMarchandise` int AUTO_INCREMENT NOT NULL,
	`IdEnteteDossier` int NULL,
	`IdMarchandise` int NULL,
	`IdUniteMesure` int NULL,
	`PoidsBrut` decimal(18, 2) NULL,
	`PoidsNet` decimal(18, 2) NULL,
	`NbreColis` decimal(18, 2) NULL,
	`NbrePalette` decimal(18, 2) NULL,
	`ValeurMarchandise` decimal(18, 2) NULL,
	`Commentaire` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`DateHeureModification` datetime NULL,
	`IdUtilisateurModification` int NULL,
 CONSTRAINT `PK_DetailDossierMarchandise` PRIMARY KEY 
	(
		`IdDetailDossierMarchandise` ASC
	)
);


CREATE TABLE `DetailDossierTrajetStop`(
	`IdDetailStopTrajet` int AUTO_INCREMENT NOT NULL,
	`IdDetailTrajet` int NULL,
	`IdLieuChargement` int NULL,
	`PoidsBrut` decimal(18, 2) NULL,
	`NbreColis` int NULL,
	`NbrePalette` int NULL,
	`Commentaire` varchar(150) NULL,
	`Facturee` int NULL,
	`Montant` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdLieuDechargement` int NULL,
 CONSTRAINT `PK_DetailDossierTrajetStop` PRIMARY KEY 
	(
		`IdDetailStopTrajet` ASC
	)
);


CREATE TABLE `DetailDossierTransitaire`(
	`IdDossierTransitaire` int AUTO_INCREMENT NOT NULL,
	`IdEnteteDossier` int NULL,
	`IdTransitaire` int NULL,
	`TelTransitaire` varchar(20) NULL,
	`Contact` varchar(50) NULL,
	`DateDepot` datetime NULL,
	`DateRemisePapier` datetime NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdPassageDouaniere` int NULL,
 CONSTRAINT `PK_DetailDossierTransitaire` PRIMARY KEY 
	(
		`IdDossierTransitaire` ASC
	)
);


CREATE TABLE `DetailMouvementStock`(
	`IdDetailMouvementStock` int AUTO_INCREMENT NOT NULL,
	`IdLigneMouvementStock` int NULL,
	`TypeDocument` int NULL,
	`IdArticle` int NULL,
	`NumSerie` int NULL,
	`Etat` int NULL,
	`IdDossier` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdDepot` int NULL,
	`IdDetailDossierMarchandise` int NULL,
	`IdDetailTrajet` int NULL,
	`IdDetailDossierTrajet` int NULL,
 CONSTRAINT `PK_DetailMouvementStock` PRIMARY KEY 
	(
		`IdDetailMouvementStock` ASC
	)
);


CREATE TABLE `DetailTracking`(
	`IdDetailTracking` int AUTO_INCREMENT NOT NULL,
	`IdDossier` int NULL,
	`IdStatutprincipale` int NULL,
	`IdStatutSecondaire` int NULL,
	`Observation` varchar(150) NULL,
	`IdDetaiLDossierTrajet` int NULL,
	`Commentaire` varchar(100) NULL,
	`DateStatut` datetime NULL,
	`HeureStatut` time(6) NULL,
	`Cloture` int NULL,
	`IdEnteteTracking` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_DetailTracking` PRIMARY KEY 
	(
		`IdDetailTracking` ASC
	)
);

CREATE TABLE `Devise`(
	`IdDevise` int AUTO_INCREMENT NOT NULL,
	`Codedevise` varchar(4) NULL,
	`IntituleDevise` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_Devise` PRIMARY KEY 
	(
		`IdDevise` ASC
	)
);


CREATE TABLE `EnteteDossier`(
	`IdDossier` int AUTO_INCREMENT NOT NULL,
	`DateDossier` datetime NULL,
	`NumDossier` varchar(50) NULL,
	`TypeDossier` int NULL,
	`IdCate;rieVoyage` int NULL,
	`idTrajet` int NULL,
	`IdLieuChargement` int NULL,
	`DatePrevuChargement` datetime NULL,
	`IdLieuDechargement` int NULL,
	`DatePrevuDechargement` datetime NULL,
	`IdClientFacturation` int NULL,
	`DateCloture` datetime NULL,
	`Commentaire` varchar(150) NULL,
	`KilometrageDepart` decimal(18, 2) NULL,
	`KilometrageArrivee` decimal(18, 0) NULL,
	`Demandeur` varchar(50) NULL,
	`IdTracking` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`Tarif` decimal(18, 0) NULL,
	`IdTypeVehicule` int NULL,
	`IdStatut` int NULL,
	`IdDossierTransbordement` int NULL,
	`NouveauTarif` decimal(18, 0) NULL,
	`tarifGroupage` decimal(18, 0) NULL,
 CONSTRAINT `PK_EnteteDossier` PRIMARY KEY 
	(
		`IdDossier` ASC
	)
);


CREATE TABLE `EnteteMouvementStock`(
	`IdMouvementStock` int AUTO_INCREMENT NOT NULL,
	`DateDocument` datetime NULL,
	`IdDepotDe` int NULL,
	`IdDepotVers` int NULL,
	`Demandeur` varchar(50) NULL,
	`Reference` varchar(50) NULL,
	`TypeDocument` int NULL,
	`Commentaire` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_EnteteMouvementStock` PRIMARY KEY 
	(
		`IdMouvementStock` ASC
	)
);


CREATE TABLE `EnteteMvtStock`(
	`IdEnteteMvtStock` int AUTO_INCREMENT NOT NULL,
	`Date` date NULL,
	`Reference` varchar(50) NULL,
	`Type` int NULL,
	`IdDepotDe` int NULL,
	`IdDepotVers` int NULL,
 CONSTRAINT `PK_EnteteMvtStock` PRIMARY KEY 
	(
		`IdEnteteMvtStock` ASC
	)
);

CREATE TABLE `Flotte`(
	`IdFlotte` int AUTO_INCREMENT NOT NULL,
	`IntituleFLotte` varchar(50) NULL,
	`Actif` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`CodeFlotte` varchar(20) NULL,
	`TypeFlotte` int NULL,
	`IdTypeCarburant` int NULL,
 CONSTRAINT `PK_Flotte` PRIMARY KEY 
	(
		`IdFlotte` ASC
	)
);

CREATE TABLE `FraisGeneraux`(
	`IdFraisGeneraux` int AUTO_INCREMENT NOT NULL,
	`Libelle` varchar(50) NULL,
	`Date` datetime NULL,
	`IdTypeFrais` int NULL,
	`IdModePaiement` int NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdAttachement` int NULL,
	`Attachement` varchar(150) NOT NULL,
 CONSTRAINT `PK_FraisGeneraux` PRIMARY KEY 
	(
		`IdFraisGeneraux` ASC
	)
);


CREATE TABLE `HistoriqueTracking`(
	`IdDetailTracking` int NULL,
	`IdDossier` int NULL,
	`IdStatutprincipale` int NULL,
	`IdStatutSecondaire` int NULL,
	`Observation` varchar(150) NULL,
	`IdDetaiLDossierTrajet` int NULL,
	`Commentaire` varchar(100) NULL,
	`DateStatut` datetime NULL,
	`HeureStatut` time(6) NULL,
	`Cloture` int NULL,
	`IdEnteteTracking` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL
);

CREATE TABLE `Kilometrage`(
	`IdKilometrage` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`DateKilometrage` datetime NULL,
	`kilometrage` decimal(18, 0) NULL,
	`DateDernierKilometrage` datetime NULL,
	`DernierKilometrage` decimal(18, 0) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdTiers` int NULL,
 CONSTRAINT `PK_Kilometrage` PRIMARY KEY 
	(
		`IdKilometrage` ASC
	)
);


CREATE TABLE `Lieu`(
	`IdLieu` int AUTO_INCREMENT NOT NULL,
	`Adresse` varchar(50) NULL,
	`IdVille` int NULL,
	`Chargement` int NULL,
	`Dechargement` int NULL,
 CONSTRAINT `PK_Lieu` PRIMARY KEY 
	(
		`IdLieu` ASC
	)
);


CREATE TABLE `LigneMouvementStock`(
	`IdLigneMouvmentStock` int AUTO_INCREMENT NOT NULL,
	`IdEnteteMouvementStock` int NULL,
	`IdArticle` int NULL,
	`NumSerieDe` varchar(20) NULL,
	`NumSerieA` varchar(20) NULL,
	`Qte` decimal(18, 0) NULL,
	`TypeDocument` int NULL,
	`IdDossier` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdDepot` int NULL,
 CONSTRAINT `PK_LigneMouvementStock` PRIMARY KEY 
	(
		`IdLigneMouvmentStock` ASC
	)
);


CREATE TABLE `LigneMvtStock`(
	`IdLigneMvtStock` int AUTO_INCREMENT NOT NULL,
	`IdEnteteMvtStock` int NULL,
	`IdArticle` int NULL,
	`Designation` varchar(50) NULL,
	`Qte` decimal(18, 0) NULL,
	`PuTTC` decimal(18, 2) NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`TypeDoc` int NULL,
 CONSTRAINT `PK_LigneMvtStock` PRIMARY KEY 
	(
		`IdLigneMvtStock` ASC
	)
);


CREATE TABLE `LotArticle`(
	`IdLotArticle` int AUTO_INCREMENT NOT NULL,
	`IdLigneDocument` int NULL,
	`IdArticle` int NULL,
	`IdDepot` int NULL,
	`NumSerie` varchar(50) NULL,
	`Qte` decimal(18, 0) NULL,
	`Type` int NULL,
 CONSTRAINT `PK_LotArticle` PRIMARY KEY 
	(
		`IdLotArticle` ASC
	)
);


CREATE TABLE `Marchandise`(
	`IdMarchandise` int AUTO_INCREMENT NOT NULL,
	`IntituleMarchanidse` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_Marchandise` PRIMARY KEY 
	(
		`IdMarchandise` ASC
	)
);


CREATE TABLE `Marque`(
	`IdMarque` int AUTO_INCREMENT NOT NULL,
	`IntituleMarque` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_Marque` PRIMARY KEY 
	(
		`IdMarque` ASC
	)
);


CREATE TABLE `Pays`(
	`IdPays` int AUTO_INCREMENT NOT NULL,
	`Pays` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreaion` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`DateHeureCreation` datetime NULL,
 CONSTRAINT `PK_Pays` PRIMARY KEY 
	(
		`IdPays` ASC
	)
);


CREATE TABLE `PeageAutoRoute`(
	`IdPeage` int AUTO_INCREMENT NOT NULL,
	`IntitulePeage` varchar(50) NULL,
 CONSTRAINT `PK_PeageAutoRoute` PRIMARY KEY 
	(
		`IdPeage` ASC
	)
);

CREATE TABLE `RechargeCarte`(
	`IdRechargeCarte` int AUTO_INCREMENT NOT NULL,
	`IdCarte` int NULL,
	`Daterecharge` datetime NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdModePaiement` int NULL,
	`Commentaire` varchar(150) NULL,
	`NumBon` varchar(20) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_RechargeCarte` PRIMARY KEY 
	(
		`IdRechargeCarte` ASC
	)
);


CREATE TABLE `RechargeCiterne`(
	`IdRechargeCiterne` int AUTO_INCREMENT NOT NULL,
	`IdCiterne` int NULL,
	`DateRechargeCiterne` datetime NULL,
	`PUTTC` decimal(18, 2) NULL,
	`Qte` decimal(18, 0) NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`NumBC` varchar(50) NULL,
	`NumBL` varchar(50) NULL,
	`Commentaire` varchar(150) NULL,
	`idAttachement` int NULL,
	`CheminAttachement` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_RechargeCiterne` PRIMARY KEY 
	(
		`IdRechargeCiterne` ASC
	)
);

CREATE TABLE `Services`(
	`IdService` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdChauffeur` int NULL,
	`NumBon` varchar(50) NULL,
	`DateService` datetime NULL,
	`NomService` varchar(50) NULL,
	`IdStation` int NULL,
	`IdPaiement` int NULL,
	`MontantTTC` decimal(18, 2) NULL,
	`IdAttachement` int NULL,
	`CheminAttachement` varchar(150) NULL,
 CONSTRAINT `PK_Services` PRIMARY KEY 
	(
		`IdService` ASC
	)
);

CREATE TABLE `Souche`(
	`IdSouche` int AUTO_INCREMENT NOT NULL,
	`NumDossierEncours` varchar(50) NULL,
	`Compteur` int NULL,
 CONSTRAINT `PK_NumPieceEncours` PRIMARY KEY 
	(
		`IdSouche` ASC
	)
);

CREATE TABLE `Station`(
	`IdStation` int primary key AUTO_INCREMENT NOT NULL,
	`CodeStation` varchar(10) NULL,
	`NomStation` varchar(50) NULL,
	`Adresse` varchar(50) NULL,
	`Ville` varchar(50) NULL,
	`Pays` int NULL,
	`Tel1` varchar(50) NULL,
	`Tel2` varchar(50) NULL,
	`Email` varchar(50) NULL,
	`Contact` varchar(50) NULL
);

CREATE TABLE `StatutPrincipale`(
	`IdStatutPrincipale` int AUTO_INCREMENT NOT NULL,
	`intituleStatutprincipale` varchar(50) NULL,
	`Pourcent` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_StatutPrincipale` PRIMARY KEY 
	(
		`IdStatutPrincipale` ASC
	)
);


CREATE TABLE `StatutSecondaire`(
	`IdStatutSecondaire` int AUTO_INCREMENT NOT NULL,
	`IntituleStatutSecondaire` varchar(50) NULL,
	`IdStatutPrincipale` int NULL,
	`Pourcentage` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`Cloture` int NULL,
 CONSTRAINT `PK_StatutSecodaire` PRIMARY KEY 
	(
		`IdStatutSecondaire` ASC
	)
);


CREATE TABLE `Tarif`(
	`IdTarif` int AUTO_INCREMENT NOT NULL,
	`IntituleTarif` varchar(50) NULL,
 CONSTRAINT `PK_Tarif` PRIMARY KEY 
	(
		`IdTarif` ASC
	)
);


CREATE TABLE `TarifClient`(
	`IdTarifClient` int AUTO_INCREMENT NOT NULL,
	`IdTiers` int NULL,
	`IdType` int NULL,
	`IdLieuChargement` int NULL,
	`IdLieuDechargement` int NULL,
	`Montant` decimal(18, 2) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdTypeTrajet` int NULL,
	`IdTrajet` int NULL,
 CONSTRAINT `PK_TarifClient` PRIMARY KEY 
	(
		`IdTarifClient` ASC
	)
);


CREATE TABLE `Tiers`(
	`IdTiers` int AUTO_INCREMENT NOT NULL,
	`RaisonSociale` varchar(50) NULL,
	`CodeTiers` varchar(10) NULL,
	`Adresse` varchar(50) NULL,
	`IdVille` int NULL,
	`idPays` int NULL,
	`Tel1` varchar(50) NULL,
	`Tel2` varchar(50) NULL,
	`Email` varchar(50) NULL,
	`Contact` varchar(50) NULL,
	`Fax` varchar(50) NULL,
	`Ice` varchar(50) NULL,
	`IdFlotte` int NULL,
	`Assurance` int NULL,
	`Cessionnaire` int NULL,
	`Client` int NULL,
	`Fournisseur` int NULL,
	`Garage` int NULL,
	`Leasing` int NULL,
	`Loueur` int NULL,
	`Station` int NULL,
	`CompagnieMaritime` int NULL,
	`ImportateurExportateur` int NULL,
	`SousTraitant` int NULL,
	`Transitaire` int NULL,
	`Port` int NULL,
	`PassageDouanier` int NULL,
	`CentreVisiteTechnique` int NULL,
	`Actif` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdCate;rie` int NULL,
	`LieuchargementDechargement` int NULL,
	`ClientFacturation` int NULL,
 CONSTRAINT `PK_Tiers` PRIMARY KEY 
	(
		`IdTiers` ASC
	)
);


CREATE TABLE `Tracking`(
	`IdTracking` int AUTO_INCREMENT NOT NULL,
	`IdDossier` int NULL,
	`IdStatutPrincipale` int NULL,
	`IdStatutSecondaire` int NULL,
	`DateStatut` datetime NULL,
	`HeureStatut` time(6) NULL,
	`Observation` varchar(100) NULL,
 CONSTRAINT `PK_Tracking` PRIMARY KEY 
	(
		`IdTracking` ASC
	)
);

CREATE TABLE `Trajet`(
	`IdTrajet` int AUTO_INCREMENT NOT NULL,
	`CodeTrajet` varchar(50) NULL,
	`IntituleTrajet` varchar(50) NULL,
	`IdTypeTrajet` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdVilleChargement` int NULL,
	`IdVilleDechargement` int NULL,
 CONSTRAINT `PK_Trajet` PRIMARY KEY 
	(
		`IdTrajet` ASC
	)
);

CREATE TABLE `TypeTrajet`(
	`IdTypeTrajet` int AUTO_INCREMENT NOT NULL,
	`IntituleTypeTrajet` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_TypeTrajet` PRIMARY KEY 
	(
		`IdTypeTrajet` ASC
	)
);

CREATE TABLE `TypeVehicule`(
	`IdTypeVehicule` int AUTO_INCREMENT NOT NULL,
	`IntituleTypeVehicule` varchar(50) NULL,
	`Volume` varchar(50) NULL,
	`Largeur` varchar(50) NULL,
	`Hauteur` varchar(50) NULL,
	`Dimension` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_TypeVehicule` PRIMARY KEY 
	(
		`IdTypeVehicule` ASC
	)
);

CREATE TABLE `UniteMesure`(
	`IdUniteMesure` int AUTO_INCREMENT NOT NULL,
	`CodeUniteMesure` varchar(10) NULL,
	`IntituleUniteMesure` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_UniteMesure` PRIMARY KEY 
	(
		`IdUniteMesure` ASC
	)
);

CREATE TABLE `Vehicule`(
	`IdVehicule` int AUTO_INCREMENT NOT NULL,
	`IdModele` int NULL,
	`Immatricule` varchar(20) NULL,
	`IdTypeContrat` int NULL,
	`NomVehicule` varchar(50) NULL,
	`CodeVehicule` varchar(50) NULL,
	`DateMiseCirculation` datetime NULL,
	`CentreCout` varchar(20) NULL,
	`NumOrdre` varchar(20) NULL,
	`PlafonKilometrage` decimal(18, 0) NULL,
	`CarteGrise` varchar(20) NULL,
	`NumChassi` varchar(20) NULL,
	`NumW` varchar(20) NULL,
	`Couleur` varchar(20) NULL,
	`CodeCLe` varchar(20) NULL,
	`DatePrivuRestition` datetime NULL,
	`KilometrageInitial` decimal(18, 0) NULL,
	`Photo` varchar(150) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`IdFlotte` int NULL,
	`IdChauffeur` int NULL,
	`DateAffectation` datetime NULL,
	`IdTypeVehicule` int NULL,
 CONSTRAINT `PK_Vehicule` PRIMARY KEY 
	(
		`IdVehicule` ASC
	)
);

CREATE TABLE `VehiculeAcquisitionAchat`(
	`IdVehiculeAcquisitionAchat` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdTiers` int NULL,
	`DateAchat` datetime NULL,
	`NumContrat` varchar(50) NULL,
	`Garantie` decimal(18, 2) NULL,
	`MontantTTC` decimal(18, 2) NULL,
 CONSTRAINT `PK_VehiculeAcquisitionAchat` PRIMARY KEY 
	(
		`IdVehiculeAcquisitionAchat` ASC
	)
);

CREATE TABLE `VehiculeAcquisitionLeasing`(
	`IdVehiculeLeasing` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdTiers` int NULL,
	`MontantTTCContrat` decimal(18, 2) NULL,
	`MontantTTCPrelevement` decimal(18, 2) NULL,
 CONSTRAINT `PK_VehiculeAcquisitionLeasing` PRIMARY KEY 
	(
		`IdVehiculeLeasing` ASC
	)
);

CREATE TABLE `VehiculeAcquisitionLocation`(
	`IdVehiculeAcquisitionLocation` int AUTO_INCREMENT NOT NULL,
	`IdVehicule` int NULL,
	`IdTiers` int NULL,
	`TypeContrat` varchar(50) NULL,
	`PlafonKilometrage` int NULL,
	`PlafonPneuMatique` int NULL,
	`LoyerMontantHT` decimal(18, 2) NULL,
 CONSTRAINT `PK_VehiculeAcquisitionLocation` PRIMARY KEY 
	(
		`IdVehiculeAcquisitionLocation` ASC
	)
);

CREATE TABLE `VehiculeSousTraitant`(
	`IdVehiculeSousTraitant` int AUTO_INCREMENT NOT NULL,
	`Immatriculation` varchar(50) NULL,
	`IdTiers` int NULL,
	`IdChauffeur` int NULL,
	`NumChassis` varchar(50) NULL,
	`IdMarque` int NULL,
	`IdCate;rie` int NULL,
	`IdTypeVehicule` int NULL,
	`NomVehicule` varchar(50) NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
 CONSTRAINT `PK_VehiculeSousTraitant` PRIMARY KEY 
	(
		`IdVehiculeSousTraitant` ASC
	)
);

CREATE TABLE `Ville`(
	`IdVille` int AUTO_INCREMENT NOT NULL,
	`NomVille` varchar(50) NULL,
	`IdPays` int NULL,
	`IdUtilisateurCreation` int NULL,
	`DateHeureCreation` datetime NULL,
	`IdUtilisateurModification` int NULL,
	`DateHeureModification` datetime NULL,
	`CODEPOSTALE` varchar(10) NULL,
 CONSTRAINT `PK_Ville` PRIMARY KEY 
	(
		`IdVille` ASC
	)
);
