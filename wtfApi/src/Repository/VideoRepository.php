<?php

namespace App\Repository;

use App\Entity\Video;
use App\Entity\Personne;
use App\Entity\Plateforme;
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

        $qbuilder = $this->createQueryBuilder('v')
                    ->addSelect('p')
                    ->leftJoin('v.production','p');
        
        foreach ($arrayParams as $k => $v) {
            if(strpos($v, '%') === false){ // Utilisation du LIKE ou du = dans un WHERE
                $qbuilder->andWhere('v.' . $k . ' = :' . $k)->setParameter(':'.$k, $v);
            } else {
                $qbuilder->andWhere('v.' . $k . ' LIKE :' . $k)->setParameter(':'.$k, $v);
            }
        }

        $results = $qbuilder->setMaxResults(100)->getQuery()->getArrayResult();
        // print_r($results);
        $results['returnedResults'] = count($results);
        $results['searchParameters'] = $arrayParams;
        
        

        return $results;
    }

    public function serializeVideo($video){
        if( $video->getProduction() !== null)
            $production = $video->getProduction()->serializeProduction();
        else
            $production = null;

        return array(
            'idVideo' => $video->getIdVideo(),
            'titre' => $video->getTitre(),
            'dateSortie' => $video->getDateSortie(),
            'poster' => $video->getPoster(),
            'plot' => $video->getPlot(),
            'trailer' => $video->getTrailer(),
            'vo' => $video->getVo(),
            'production' => $production,
            'personnes' => $this->getEntityManager()->getRepository(Personne::class)->serializePersonnes($video->getIdPersonne()),
            'plateformes' => $this->getEntityManager()->getRepository(Plateforme::class)->serializePlateformes($video->getIdPlateforme())
        );
    }
}
