<?php

namespace App\Repository;

use App\Entity\Film;
use App\Entity\Video;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Film|null find($id, $lockMode = null, $lockVersion = null)
 * @method Film|null findOneBy(array $criteria, array $orderBy = null)
 * @method Film[]    findAll()
 * @method Film[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FilmRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Film::class);
    }

    /**
     * @return Film[] Returns an array of Film objects
     */
    /*
    public function findAllFilms()
    {
        return $this->createQueryBuilder('f')
            // ->andWhere('f.exampleField = :val')
            // ->setParameter('val', $value)
            ->setMaxResults(10)
            ->getQuery()
            ->getArrayResult()
        ;
    }
    */
    

    /*
    public function findOneBySomeField($value): ?Film
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function serializeFilm($film) {
        return array_merge(
            array(
                'type' => 'film',
                'duree' => [
                    'total' => $film->getDuree(),
                    'heures' => substr(date('H\hi\m', mktime(0,$film->getDuree())),1),
                ]
            ),
            $this->getEntityManager()->getRepository(Video::class)->serializeVideo($film->getIdVideo())
            
        );
    }
   
    public function serializeFilms($array) {
        $result = array();
        foreach($array as $film) {
            
            $result[] = $this->getEntityManager()->getRepository(Film::class)->serializeFilm($film);
        }
        return $result;
    }
}
