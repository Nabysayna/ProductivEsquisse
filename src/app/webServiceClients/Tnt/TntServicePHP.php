    function ajoutabonnement($params)
    {
      $correspSession = $this->em->getRepository('WSServerBundle:Authorizedsessions')->findOneBy(array('token'=>$params->token));
      if(empty($correspSession))
        return json_encode( array('errorCode' => 0, 'message' => 'Utilisateur non authentifié') ) ;
      else{
          $tayy = date("Y-m-d") ;

          $echeance = date ('Y-m-d', strtotime($tayy.'+'.$params->duree.' month')) ;

          $infosFinance = $this->commissionneur->estHabilite($correspSession, $params->montant,  'TNT', 'ABONNEMENT') ;
          if ($infosFinance!=false){
            $newClient = new Clients() ;
            $result = $this->tntClient->ajoutabonnement($params);
            $addTime = new \Datetime();
            $paramToRecord = array( 'prenom' => $params->prenom, 'nom' => $params->nom, 'tel' => $params->tel, 'adresse' => $params-$
            if(json_decode($result)->response=="ok"){
                $tntRecord = new Tnt();
                $tntRecord->setIduser($correspSession->getIdUser());
                $tntRecord->setTypeoperation("abonnement");
                $tntRecord->setInfosoperation(json_encode($paramToRecord));
                $tntRecord->setDateOperation($addTime);
                $tntRecord->setEcheance(new \DateTime($echeance));
                $tntRecord->setDependsOn($correspSession->getDependsOn());
                $this->em->persist($tntRecord);

                if($params->typedebouquet==1)
                  $typebouquet = "Maanaa" ;
                if($params->typedebouquet==2)
                  $typebouquet = "Boul khool" ;
                if($params->typedebouquet==3)
                  $typebouquet = "Maanaa + Boul khool" ;

                  $newAbonnement= new Abonnements();
                  $newAbonnement->setNomservice('TNT');
                  $infosup=json_encode( array('type'=> $typebouquet ) );
                  $newAbonnement->setInfosup($infosup);
                  $newAbonnement->setPrenom($params->prenom);
                  $newAbonnement->setNom($params->nom);
                  $newAbonnement->setTelephone($params->tel);
                  $newAbonnement->setDateajout( $addTime );
                  $newAbonnement->setEcheance( new \Datetime($echeance) );
                  $newAbonnement->setIdUser( $correspSession->getIdUser());

                  $newAbonnement->setDependsOn( $correspSession->getDependsOn());
                  $this->em->persist($newAbonnement);

                   $client = $this->em->getRepository('WSServerBundle:Clients')->findOneBy(array('telephone'=>$newAbonnement->getTel$
                   if(empty($client))
                   {
                    $newClient= new Clients();
                    $newClient->setNom($newAbonnement->getNom());
                    $newClient->setPrenom($newAbonnement->getPrenom());
                    $newClient->setTelephone($newAbonnement->getTelephone());
                    $newClient->setIdUser( $correspSession->getIdUser());
                    $newClient->setDependsOn( $correspSession->getDependsOn());
                    $newClient->setDateAjout($addTime);
                    $this->em->persist($newClient);
                   }

                  $this->commissionneur->repartirCommissions($correspSession, $infosFinance['commissionnement'], $infosFinance['caution'], 'TNT',  , 'ABONNEMENT', $params->montant, -1) ;

                }
              $this->em->flush();
             return $result;
           }
        return json_encode( array("errorCode" => 0, "message" => "Votre abonnement n'a pas pu être enregistré") ) ;

      }
    }
