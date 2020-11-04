<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Serie
 *
 * @ORM\Table(name="serie")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="App\Repository\SerieRepository")
 */
class Serie
{
    /**
     * @var int
     *
     * @ORM\Column(name="nb_saison", type="integer", nullable=false)
     */
    private $nbSaison;

    /**
     * @var \Video
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Video", fetch="EAGER")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     * })
     */
    private $idVideo;

    public function getNbSaison(): ?int
    {
        return $this->nbSaison;
    }

    public function setNbSaison(int $nbSaison): self
    {
        $this->nbSaison = $nbSaison;

        return $this;
    }

    public function getIdVideo(): ?Video
    {
        return $this->idVideo;
    }

    public function setIdVideo(?Video $idVideo): self
    {
        $this->idVideo = $idVideo;

        return $this;
    }

    public function serializeSerie() {
        return array_merge(
            array(
                'type' => 'serie',
                'saisons' => $this->getNbSaison()
            ),
            $this->getIdVideo()->serializeVideo()
        );
    }


}
