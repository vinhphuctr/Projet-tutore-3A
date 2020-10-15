<?php

namespace App\Repository;

use App\Entity\Video;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Video|null find($id, $lockMode = null, $lockVersion = null)
 * @method Video|null findOneBy(array $criteria, array $orderBy = null)
 * @method Video[]    findAll()
 * @method Video[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VideoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Video::class);
    }

    public function findVideo($arrayParams){

        $qbuilder = $this->createQueryBuilder('v');
        
        foreach ($arrayParams as $k => $v) {
            if(strpos($v, '%') === false){ // Utilisation du LIKE ou du = dans un WHERE
                $qbuilder->andWhere('v.' . $k . ' = :' . $k)->setParameter(':'.$k, $v);
            } else {
                $qbuilder->andWhere('v.' . $k . ' LIKE :' . $k)->setParameter(':'.$k, $v);
            }
        }

        $results = $qbuilder->setMaxResults(100)->getQuery()->getArrayResult();
        $results['returnedResults'] = count($results);
        $results['searchParameters'] = $arrayParams;
        

        return $results;
    }
}
