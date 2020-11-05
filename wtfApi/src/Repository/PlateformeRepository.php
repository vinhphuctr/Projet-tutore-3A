<?php

namespace App\Repository;

use App\Entity\Plateforme;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Plateforme|null find($id, $lockMode = null, $lockVersion = null)
 * @method Plateforme|null findOneBy(array $criteria, array $orderBy = null)
 * @method Plateforme[]    findAll()
 * @method Plateforme[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlateformeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Plateforme::class);
    }

    public function serializePlateforme($plateforme){
        return array(
            'idPlateforme' => $plateforme->getIdPlateforme(),
            'nom' => $plateforme->getNom(),
            'redirection' => $plateforme->getRedirection(),            
            'logo' => $plateforme->getLogo()
        );
    }

    public function serializePlateformes($plateformes) {
        $result = array();
        foreach($plateformes as $p) {
            $result[] = $this->serializePlateforme($p);
        }
        return $result;
    }
}
