<?php

namespace App\Repository;

use App\Entity\Personne;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Personne|null find($id, $lockMode = null, $lockVersion = null)
 * @method Personne|null findOneBy(array $criteria, array $orderBy = null)
 * @method Personne[]    findAll()
 * @method Personne[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PersonneRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Personne::class);
    }

    public function serializePersonne($personne){
        return array(
            'idPersonne' => $personne->getIdPersonne(),
            'prenom' => $personne->getPrenom(),
            'nom' => $personne->getNom(),            
            'nationalite' => $personne->getNationalite(),
            'role' => $personne->getIdRole(),
        );
    }

    public function serializePersonnes($personnes) {
        $result = array();
        foreach($personnes as $p) {
            $result[] = $this->serializePersonne($p);
        }
        return $result;
    }
}
