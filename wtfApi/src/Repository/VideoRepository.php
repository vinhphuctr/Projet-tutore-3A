<?php

namespace App\Repository;

use App\Entity\Video;
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

    // /**
    //  * @return Video[] Returns an array of Video objects
    //  */
    
    // public function findByTitre($value)
    // {
    //     return $this->createQueryBuilder('v')
    //         ->andWhere('v.titre = :val')
    //         ->setParameter('val', $value)
    //         ->orderBy('v.idVideo', 'ASC')
    //         ->setMaxResults(10)
    //         ->getQuery()
    //         ->getResult()
    //     ;
    // }

    public function findVideo($arrayParams){

        $qbuilder = $this->createQueryBuilder('v');
        //
        foreach ($arrayParams as $k => $v) {
            if(strpos($v, '%') === false){ // Utilisation du LIKE ou du = dans un WHERE
                $qbuilder->andWhere('v.' . $k . ' = :val')->setParameter('val', $v);
            } else {
                $qbuilder->andWhere('v.' . $k . ' LIKE :val')->setParameter('val', $v);
            }
        }
        // $qbuilder
        // ->where('v.plot LIKE ?', '%gambling')
        // ->andWhere('v.titre LIKE ?', '%asino%');

        $results = $qbuilder->setMaxResults(100)->getQuery()->getArrayResult();
        $results['returnedResults'] = count($results);

        return $results;
    }
    

    /*
    public function findOneBySomeField($value): ?Video
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
