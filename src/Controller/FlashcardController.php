<?php

namespace App\Controller;

use App\Repository\LanguagesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Languages;

/**
 * @Route("/api/flashcard", name="api_flashcard")
 */
class FlashcardController extends AbstractController
{
    private $entityManager;
    private $languageRepository;

    public function __construct(EntityManagerInterface $entityManager, LanguagesRepository $languagesRepository){
        $this->entityManager = $entityManager;
        $this->languageRepository = $languagesRepository;
    }

    /**
     * @Route("/read", name="api_flashcard_read", methods={"GET"})
     */
    public function read()
    {
        $languages = $this->languageRepository->findAll();
        $arrayOfLanguages = [];

        foreach ($languages as $language) {
            $arrayOfLanguages[] = $language->toArray();
        }
        return $this->json($arrayOfLanguages);
    }

    /**
     * @Route("/create", name="api_flashcard_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());
        $language = new Languages();

        $language->setEnglish($content->english);
        $language->setConverted($content->converted);
        $language->setLanguage($content->language);

        try {
            $this->entityManager->persist($language);
            $this->entityManager->flush();
            return $this->json([
                'language' => $language->toArray()
            ]);

        } catch (Exception $exception){
            //error
        }
    }

}
